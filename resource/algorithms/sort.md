冒泡排序：比较任何两个相邻的项，如果第一个比第二个大，则交换它们。元素项向上移动至正确的顺序
```
function bubbleSort (arr) {
  var length = arr.length,
    swap = function (index1, index2) {
      var temp = arr[index1];
      arr[index1] = arr[index2];
      arr[index2] = temp;
    };

  for (var i = 0; i < length; i++) {
    for (var j = 0; j < length - i - 1; j++) {
      if (arr[j] > arr[j+1]) {
        swap(j, j+1);
      }
    }
  }
}
```

选择排序：大致的思路是找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推。
```
function selectionSort (arr) {
  var length = arr.length,
    indexMin,
    swap = function (index1, index2) {
      var temp = arr[index1];
      arr[index1] = arr[index2];
      arr[index2] = temp;
    };

  for (var i = 0; i < length - 1; i++) {
    indexMin = i;

    for (var j = i; j < length; j++) {
      if (arr[indexMin] > arr[j]) {
        indexMin = j;
      }
    }
    if (i !== indexMin) {
      swap(i, indexMin);
    }
  }
};
```
 插入排序
```
function insertionSort (arr) {
  var length = arr.length,
    temp,
    j;

  for (var i = 1; i < length; i++) {
    j = i;
    temp = arr[i];

    while (j > 0 && arr[j-1] > temp) {
      arr[j] = arr[j-1];
      j--;
    }
    arr[j] = temp;
  }
}
```
 归并排序
```
function mergeSort (arr) {
  var mergeSortRec = function (arr) {
    var length = arr.length;

    if (length === 1) {
      return arr;
    }
    var mid = Math.floor(length / 2),
      left = arr.slice(0, mid),
      right = arr.slice(mid, length);

    return merge(mergeSortRec(left), mergeSortRec(right));
  };

  function merge (left, right) {
    var result = [],
      il = 0,
      ir = 0;

    while (il < left.length && ir < right.length) {
      if (left[il] < right[ir]) {
        result.push(left[il++]);
      } else {
        result.push(right[ir++]);
      }
    }

    while (il < left.length) {
      result.push(left[il++]);
    }

    while (ir < right.length) {
      result.push(right[ir++]);
    }

    return result;
  };

  arr = mergeSortRec(arr);
}
```
快排
```
function quickSort (arr, left, right) {
  var pivot = arr[left],
    i = left,
    j = right,
    temp;

  if (left > right) {
    return;
  }

  while (i < j) {
    while (arr[j] >= pivot && j > i) {
      j--;
    }

    while (arr[i] <= pivot && i < j) {
      i++;
    }

    if (i < j) {
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  arr[left] = arr[i];
  arr[i] = pivot;

  quickSort(arr, left, i-1);
  quickSort(arr, i+1, right)
}
```
####二分查找
输入一个有序数组和一个数，若在数组中返回索引，若不在返回应该插入的索引。
```
var getPosInArray = function(arr, ele) {
    if (Object.prototype.toString.apply(arr) !== '[object Array]') {
        throw Error("The first param must be an array!!!");
    }
    if (typeof ele !== "number") {
        throw Error("The second param must be a number!!!");
    }
    var left = 0,
        right = arr.length - 1,
        middle;
    for (; left <= right;) {
        middle = left + Math.floor((right - left) / 2);
        if (arr[middle] === ele) {
            return middle;
        } else if (arr[middle] > ele) {
            right = middle - 1;
        } else {
            left = middle + 1;
        }
    }
    return left;
};
```