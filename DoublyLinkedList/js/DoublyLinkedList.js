/**
 * This script implements the doubly-linked list.
 * 
 * References: 
 * [] https://developer.mozilla.org/de/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
 * [] https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/create
 * [] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor
 * [] https://stackoverflow.com/questions/8453887/why-is-it-necessary-to-set-the-prototype-constructor
 */


/**
 * Global namespace
 */
var DLL = DLL || {};

/**
 * Entry - class, constructor
 * @params
 */
var Entry = function (prev, next, value) {
	this.prev = prev;
	this.next = next;
	this.value = value;
};

/**
 * DoublyLinkedList - class, constructor
 */
var DoublyLinkedList = function () {
	this.head = null;
	this.size = 0;
};

/**
 * DoublyLinkedList - method
 * Returns the number of elements (entries) in this list
 * @return Number of elements (entries) in this list
 */
DoublyLinkedList.prototype.getSize = function () {
	return this.size;
};

/**
 * DoublyLinkedList - method
 * Appends a new element (entry) with value info to the end of list.
 * This method has been implemented in an iterative manner.
 * @params info Value of the new element
 */
DoublyLinkedList.prototype.add = function (info) {
	if ( !this.head ) { // this.head == null
		this.head = new Entry(null, null, info);
	} else {
		var tmp = this.head;
		// Checks if the next element is null or not
		for ( ; tmp.next !== null; tmp = tmp.next );
		// If null, then insert a new element at this position
		tmp.next = new Entry(tmp, null, info);
	}
	this.size++;
};

/**
 * DoublyLinkedList - method
 * Appends a new element (entry) with value info to the end of list.
 * This method has been implemented in a recursive manner.
 * @params info Value of the new element
 */
DoublyLinkedList.prototype.addRec = function (info) {
	if ( !this.head ) 
		this.head = new Entry(null, null, info);
	else 
		this.addRecHelper(this.head, info);
	
	this.size++;
};

/**
 * Helper function for recursion implementation of addRec.
 */
DoublyLinkedList.prototype.addRecHelper = function (el, info) {
	if ( el.next !== null )
		this.addRecHelper(el.next, info);
	else
		el.next = new Entry(el, null, info);	
};


/**
 * DoublyLinkedList - method
 * Inserts a new element - with value info - at the position index of the list.
 * The index range is from 0 until size-1.
 * @params index Index at which the new element is inserted.
 * 				 Index can only between from 0 until size-1.
 *         info Value of the new element
 */
DoublyLinkedList.prototype.insertAt = function (index, info) {
	if ( index < 0 || index >= this.size ) {
		if ( !this.head && index == this.size ) {
			this.head = new Entry(null, null, info);
			this.size++;
		}
		return;
	}
	if ( index == 0 ) { 
		this.head.prev = new Entry(null, this.head, info);
		this.head = this.head.prev;
	}
	else {
		// Determines element at given index
		var tmp = this.head;
		for ( var i = 0; i < index; i++, tmp = tmp.next );
		// Insert new element at given index
		tmp.prev.next = new Entry(tmp.prev, tmp, info);
		tmp.prev = tmp.prev.next;
	}
	this.size++;
};
 
/**
 * DoublyLinkedList - method
 * Removes the element (Entry) at position index and returns its value
 * (Entry.value). The index begins at 0 and ends at size-1. 
 * At index == 0 the first element of list is simply removed. 
 * If the index is invalid, e.g. index < 0, then no element is removed 
 * and the method returns the smallest number possible in Javascript, 
 * namely Number.MIN_VALUE
 * @params index Index of element to be removed; from 0 until size-1
 * @returns 
 */
DoublyLinkedList.prototype.remove = function (index) {
	if ( index < 0 || index >= this.size || this.head === null ) 
		return Number.MIN_VALUE;
	var val = -1, tmp = this.head;
	for ( var i = 0; i < index; i++ ) tmp = tmp.next;
	val = tmp.value;
	if ( this.size == 1 ) {
		this.head = null;
	} else { // this.size > 1
		if ( index < this.size - 1) {
			tmp.next.prev = tmp.prev;
			if ( index == 0 ) 
				this.head = tmp.next;
		}
		if ( index > 0 )
			tmp.prev.next = tmp.next;
		tmp = tmp.prev = tmp.next = null;
	}	
	this.size--;
	return val;
};

/**
 * DoublyLinkedList - method
 * Prints all elements in the list.
 */
DoublyLinkedList.prototype.toString = function () {
	var out = "[";
	if ( this.head ) { // this.head !== null
		out += this.head.value;
		for ( var tmp = this.head.next; tmp !== null; tmp = tmp.next ) {
			out += ", " + tmp.value;
		}
	}
	out += "]";
	return out;
};