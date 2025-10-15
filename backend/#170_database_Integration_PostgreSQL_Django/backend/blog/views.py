from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from django.db.models import Count, Q

from .models import Category, Tag, Post, Comment, PostView
from .serializers import (
    CategorySerializer, TagSerializer, PostListSerializer,
    PostDetailSerializer, CommentSerializer, PostViewSerializer,
    PostCreateUpdateSerializer
)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

    def get_queryset(self):
        return Category.objects.annotate(
            post_count=Count('posts', filter=Q(posts__status='published'))
        ).order_by('name')


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

    def get_queryset(self):
        return Tag.objects.annotate(
            post_count=Count('posts', filter=Q(posts__status='published'))
        ).order_by('name')


class PostViewSet(viewsets.ModelViewSet):
    # Add queryset at class level to fix the basename issue
    queryset = Post.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'tags', 'author', 'status']
    search_fields = ['title', 'content', 'excerpt']
    ordering_fields = ['publish_date', 'created_at', 'updated_at']
    ordering = ['-publish_date']
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = Post.objects.select_related('author', 'category').prefetch_related('tags')
        
        if self.action == 'list':
            # For list view, only show published posts to non-authenticated users
            if not self.request.user.is_authenticated:
                queryset = queryset.filter(
                    status='published',
                    publish_date__lte=timezone.now()
                )
            return queryset
        
        # For detail view, authenticated users can see drafts
        if self.request.user.is_authenticated:
            return queryset
        else:
            return queryset.filter(
                status='published',
                publish_date__lte=timezone.now()
            )

    def get_serializer_class(self):
        if self.action == 'list':
            return PostListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return PostCreateUpdateSerializer
        return PostDetailSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        
        # Track post view
        if instance.is_published:
            PostView.objects.create(
                post=instance,
                ip_address=self.get_client_ip(request),
                user_agent=request.META.get('HTTP_USER_AGENT', '')
            )
        
        return Response(serializer.data)

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    @action(detail=True, methods=['get'])
    def comments(self, request, slug=None):
        post = self.get_object()
        comments = post.comments.filter(is_approved=True)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def views(self, request, slug=None):
        post = self.get_object()
        views = post.views.all()
        serializer = PostViewSerializer(views, many=True)
        return Response(serializer.data)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['post', 'is_approved']

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Comment.objects.all()
        return Comment.objects.filter(is_approved=True)


class PostViewViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PostView.objects.all()
    serializer_class = PostViewSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['post']