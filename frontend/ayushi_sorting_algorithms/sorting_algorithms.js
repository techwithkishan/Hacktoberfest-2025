// sorting_algorithms.js

// --- Sample array ---
let arr = [5, 3, 8, 4, 2, 7, 1, 6];

// --- Bubble Sort ---
function bubbleSort(array) {
    let n = array.length;
    for (let i = 0; i < n-1; i++) {
        for (let j = 0; j < n-i-1; j++) {
            if (array[j] > array[j+1]) {
                [array[j], array[j+1]] = [array[j+1], array[j]];
            }
        }
    }
    return array;
}

// --- Quick Sort ---
function quickSort(array) {
    if (array.length <= 1) return array;
    let pivot = array[array.length - 1];
    let left = [], right = [];
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] < pivot) left.push(array[i]);
        else right.push(array[i]);
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
}

// --- Merge Sort ---
function mergeSort(array) {
    if (array.length <= 1) return array;
    let mid = Math.floor(array.length/2);
    let left = mergeSort(array.slice(0, mid));
    let right = mergeSort(array.slice(mid));
    return merge(left, right);
}
function merge(left, right) {
    let result = [];
    while(left.length && right.length) {
        if(left[0] < right[0]) result.push(left.shift());
        else result.push(right.shift());
    }
    return [...result, ...left, ...right];
}

// --- Heap Sort ---
function heapSort(array) {
    function heapify(arr, n, i){
        let largest = i;
        let l = 2*i + 1;
        let r = 2*i + 2;
        if(l < n && arr[l] > arr[largest]) largest = l;
        if(r < n && arr[r] > arr[largest]) largest = r;
        if(largest != i){
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            heapify(arr, n, largest);
        }
    }
    let n = array.length;
    for(let i = Math.floor(n/2)-1; i >= 0; i--) heapify(array, n, i);
    for(let i = n-1; i > 0; i--){
        [array[0], array[i]] = [array[i], array[0]];
        heapify(array, i, 0);
    }
    return array;
}

// --- Benchmark ---
let algorithms = {bubbleSort, quickSort, mergeSort, heapSort};
for(let key in algorithms){
    let copy = [...arr];
    console.time(key);
    algorithms[key](copy);
    console.timeEnd(key);
}
