from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'tags', views.TagViewSet)
router.register(r'posts', views.PostViewSet, basename='post')  # Add basename here
router.register(r'comments', views.CommentViewSet)
router.register(r'post-views', views.PostViewViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]