
// C IMPLEMENTATION OF HASH TABLES USING CHAINING (linked-list)
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TABLE_SIZE 10

typedef struct Node{
    int key;
    int value;
    
    struct Node* next;
}Node;

typedef struct HashTable{
    Node* table[TABLE_SIZE];
}HashTable;


//This is the hash function
int hash(int key)
{
    return key%TABLE_SIZE;
}

//The below block of code creates a new node.
Node* createNode(int key, int value)
{
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->key = key;
    newNode->value = value;
    newNode->next = NULL;
    return newNode;
}


//The below function initializes a hashtable.
HashTable* createHashTable()
{
    HashTable* ht = (HashTable*)malloc(sizeof(HashTable));
    
    int j=0;
    
    while(j<TABLE_SIZE)
    {
      ht->table[j]=NULL;
      j++;
    }
    
    return ht;
}

//This is a insert function
void insert(HashTable* ht, int key, int value)
{
    int idx = hash(key);
    Node* newNode = createNode(key, value);
    newNode->next = ht->table[idx];
    ht->table[idx] = newNode;
}

//This is a search function that searches for a key
int search(HashTable *ht, int key)
{
    int idx = hash(key);
    Node* temp = ht->table[idx];
    
    while(temp)
    {
        if(temp->key == key)
        return temp->value;
        
        temp = temp->next;
    }
    
    return -1;
}

void delete(HashTable* ht, int key)
{
    int idx = hash(key);
    Node* temp = ht->table[idx];
    Node* prev = NULL;
    
    
    while(temp)
    {
        if(temp->key == key)
        {
            if(prev)
            prev->next = temp->next;
        
        else{
            ht->table[idx]=temp->next;
        }
        
        free(temp);
        return;
        }
        prev = temp;
        temp = temp->next;
    }
}

void display(HashTable* ht)
{
    int z=0;
    while(z<TABLE_SIZE)
    {
        printf("Bucket %d: ",z);
        Node* temp = ht->table[z];
        
        while(temp)
        {
            printf("(%d -> %d) ",temp->key, temp->value);
            temp = temp->next;
        }
        
        printf("\n");
        
        z++;
    }
}



int main()
{
    printf("Hello World");
    
    HashTable* ht = createHashTable();
    
    insert(ht, 1, 10);
    insert(ht, 11, 20);
    insert(ht, 21, 30);
    insert(ht, 2 ,15);
    
    display(ht);
    
    printf("\n Search 21: %d\n", search(ht,21));
    printf("\n Seach 100: %d\n",search(ht,100));
    
    delete(ht,21);
    printf("After deleting 21: \n");
    display(ht);
    
    
    return 0;

}