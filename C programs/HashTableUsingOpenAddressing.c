
// C IMPLEMENTATION OF HASH TABLES USING OPEN ADDRESSING (linear probing)
#include <stdio.h>
#include <stdlib.h>

#define TABLE_SIZE 10
#define EMPTY -1
#define DELETED -2


typedef struct HashTable{
    int keys[10];
    int values[10];
}HashTable;


int hash(int key)
{
    return key%10;
}


void initHashTable(HashTable* ht)
{
    int i=0;
    while(i<10)
    {
        ht->keys[i] = -1;
        ht-> values[i] = 0;
        
        i++;
    }
}

void insert(HashTable* ht, int key, int value)
{
    int idx = hash(key);
    int start = idx;
    
    do{
        if(ht->keys[idx] == -1 || ht->keys[idx] == -2)
        {
            ht->keys[idx] = key;
            ht->values[idx] = value;
            
            return;
        }
        
        idx = (idx+1)%10;
    }while(idx != start);
    
    printf("Capacity reached to maximum ! Table is full !");
}


int search(HashTable* ht, int key)
{
    int idx = hash(key);
    int start = idx;
    
    do{
        if(ht->keys[idx] == -1)
        return -1;
        
        if(ht->keys[idx] == key)
        return ht->values[idx];
        
        idx = (idx+1)%10;
    } while(idx != start);
    
    return -1;
}


void delete(HashTable* ht, int key)
{
    int idx = hash(key);
    int start = idx;
    
    do{
        if(ht->keys[idx] == -1)
        return;
        
        if(ht->keys[idx] == key)
        {
            ht->keys[idx] = -2;
            ht->values[idx] = 0;
            return;
        }
        
        idx = (idx+1)%10;
    }while(idx != start);
    
}

void display(HashTable* ht)
{
    int i=0;
    while(i < 10)
    {
        if(ht->keys[i] >= 0)
        printf("[%d] -> key: %d, Value : %d\n",i,ht->keys[i], ht->values[i]);
        
        else
        printf("[%d] -> EMPTY \n",i);
        
        i++;
    }
}


int main()
{
    HashTable ht;
    initHashTable(&ht);
    
    insert(&ht,2,11);
    insert(&ht,12,21);
    insert(&ht,22,31);
    insert(&ht, 3, 16);
    
    display(&ht);
    
    printf("\n Search 12 : %d\n", search(&ht, 12));
    printf("Search 6 : %d\n", search(&ht, 6));
    
    delete(&ht, 12);
    printf("]n After deleting 12 : \n");
    display(&ht);
    
    return 0;
}