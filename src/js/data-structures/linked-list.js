import { defaultEquals } from "../util";
import { Node } from "./models/linked-list-models";

export default class LinkedList {
  // Constructor initializes the LinkedList
  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn; // Function to compare elements for equality
    this.count = 0; // Number of elements in the list
    this.head = undefined; // Reference to the first node in the list
  }

  // Adds an element to the end of the list
  push(element) {
    const node = new Node(element);
    let current;
    if (this.head == null) {
      // If the list is empty, set the new node as the head
      this.head = node;
    } else {
      // Traverse to the last node and add the new node
      current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++; // Increment the count of elements
  }

  // Returns the element at the specified index
  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head;
      // Traverse the list to the desired index
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined; // Return undefined if index is out of bounds
  }

  // Inserts an element at a specified index
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      if (index === 0) {
        // Insert at the beginning of the list
        const current = this.head;
        node.next = current;
        this.head = node;
      } else {
        // Insert at any other position
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true; // Insertion successful
    }
    return false; // Index out of bounds, insertion failed
  }

  // Removes an element at a specified index
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        // Remove the first element
        this.head = current.next;
      } else {
        // Remove an element from any other position
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element; // Return the removed element
    }
    return undefined; // Index out of bounds, removal failed
  }

  // Removes the first occurrence of a specified element
  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  // Returns the index of the first occurrence of an element
  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.size() && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i; // Element found, return its index
      }
      current = current.next;
    }
    return -1; // Element not found
  }

  // Checks if the list is empty
  isEmpty() {
    return this.size() === 0;
  }

  // Returns the number of elements in the list
  size() {
    return this.count;
  }

  // Returns the first node in the list
  getHead() {
    return this.head;
  }

  // Removes all elements from the list
  clear() {
    this.head = undefined;
    this.count = 0;
  }

  // Returns a string representation of the list
  toString() {
    if (this.head == null) {
      return "";
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }
}
