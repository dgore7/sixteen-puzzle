class Heap {
  constructor() {
    this._arrayHeap = [];
    this._cap = 0;
  }

  _getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  _leftChildIndex(index) {
    return (index * 2) + 1;
  }

  _rightChildIndex(index) {
    return (index * 2) + 2;
  }

  _leftChild(index) {
    return this._arrayHeap[this._leftChildIndex(index)];
  }

  _rightChild(index) {
    return this._arrayHeap[this._rightChildIndex(index)];
  }

  _swim(index) {
    let done = false;
    while (index > 0 && !done) {
      let parentIndex = this._getParentIndex(index);
      let current     = this._arrayHeap[index];
      let parent      = this._arrayHeap[parentIndex];
      if (current < parent) {
        this._swap(parentIndex, index);
        index = parentIndex
      }
      else {
        done = true;
      }
    }
  }

  _sink(index) {
    let current = this._arrayHeap[index];
    if (this._rightChildIndex(index) < this._cap) {
      let left    = this._leftChildIndex(index);
      let right   = this._rightChildIndex(index);
      let smallerChild, smallerIndex;
      if (this._arrayHeap[left] < this._arrayHeap[right]) {
        smallerChild = this._arrayHeap[left];
        smallerIndex = left;
      } else {
        smallerChild = this._arrayHeap[right];
        smallerIndex = right;
      }
      if (current > smallerChild) {
        this._swap(index, smallerIndex);
        this._sink(smallerIndex);
      }
    } else if (this._leftChildIndex(index) < this._cap) {
      if (current > this._leftChild(index)) {
        let leftIndex = this._leftChildIndex(index);
        this._swap(index, leftIndex);
        this._sink(leftIndex);
      }
    }
  }

  _swap(i, j) {
    const temp = this._arrayHeap[i];
    this._arrayHeap[i] = this._arrayHeap[j];
    this._arrayHeap[j] = temp;
  }

  insert(element) {
    this._arrayHeap.push(element);
    this._cap += 1;
    this._swim(this._cap - 1);
  }

  extractMin() {
    this._swap(0, this._cap - 1);
    this._cap -= 1;
    const element = this._arrayHeap.pop();
    this._sink(0);
    return element;
  }
}

heap = new Heap();
heap.insert(5);
heap.insert(3);
heap.insert(2);
heap.insert(8);
while (heap._arrayHeap.length != 0) {
  console.log(heap._arrayHeap);
  console.log('result:  ' + heap.extractMin());
}
