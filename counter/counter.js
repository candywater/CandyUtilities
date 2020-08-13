

/**
 * this is the period
 * @see https://stackoverflow.com/questions/17562089/how-to-count-number-of-requests-in-last-second-minute-and-hour
 */
const CONSTTIME= 1000*60*60*24; // 24 hours

/**
 * node of a Counter
 */
class Visiter{
  constructor(time = new Date()){
    this.time = time;
    this.next = null;
  }
}

/**
 * linked-list
 */
class Counter{
  constructor(head, tail){
    this.head = head ? head : null;
    this.tail = tail ? tail : null;
  }

  /**
   * 
   * @param {Date} newdate 
   * @public
   */
  add(newdate = new Date()){
    if(this.tail){
      this.tail.next = new Visiter(newdate);
      this.tail = this.tail.next;
    }
    else{
      this.tail = new Visiter(newdate)
    }
    if(this.head){
      this.head = this.deleteolder(this.head, this.tail)
    }
    else{
      this.head = this.tail;
    }
  }

  /**
   * 
   * @param {Visiter} h 
   * @param {Visiter} t 
   * @returns header
   * @private
   */
  deleteolder(h, t){
    if(!h) return t;
    while(h.time < t.time - CONSTTIME){
      h = h.next;
    }
    return h;
  }

  /**
   * @returns countnum
   * @public
   */
  count(){
    let h = this.head;
    let t = this.tail;
    if(!h || !t) return -1;
    let res = 1;
    while(h != t) {
      h = h.next;
      res++;
    }
    return res;
  }

}


/**
 * test
 * @param {*} c counter
 * @param {*} d date
 */
function TestList(c, d){
  c.add(new Date(d))
}

/**
 * test
 * @param {*} a counter number 
 * @param {*} b correct number
 */
function AssertInt(a, b){
  if(parseInt(a) === parseInt(b)){
    console.log(`====ok====[count: ${a}]`)
  }
  else{
    console.log(`====wrong=[count: ${a}]`)
  }
}

function Test(){
//class debug
  var cc = new Counter();
  TestList(cc, "2018-4-3")
  AssertInt(cc.count(), 1)

  TestList(cc, "2019-4-3")
  AssertInt(cc.count(), 1)

  TestList(cc, "2020-4-3")
  AssertInt(cc.count(), 1)

  TestList(cc, Date.now())
  AssertInt(cc.count(), 1)

  TestList(cc, Date.now())
  AssertInt(cc.count(), 2)

  TestList(cc, Date.now())
  AssertInt(cc.count(), 3)

  TestList(cc, Date.now())
  AssertInt(cc.count(), 4)

  TestList(cc, Date.now())
  AssertInt(cc.count(), 5)

  TestList(cc, Date.now())
  AssertInt(cc.count(), 6)

  TestList(cc, Date.now())
  AssertInt(cc.count(), 7)
}

module.exports = {
  // head : head,
  // tail : tail,
  // add : add,
  // count : count,
  // deleteall : deleteall,
  Counter: Counter,
}

// test
// Test();
