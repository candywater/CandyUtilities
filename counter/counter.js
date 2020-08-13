
//https://stackoverflow.com/questions/17562089/how-to-count-number-of-requests-in-last-second-minute-and-hour
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

  // 这个不对 不能达到清空的效果
  // static deleteall(h, t){
  //   h = null;
  //   t = null;
  // }
}
//class debug
// var cc = new Counter();
// TestList(cc, "2018-4-3")
// TestList(cc, "2019-4-3")
// TestList(cc, "2020-4-3")
// TestList(cc, Date.now())
// TestList(cc, Date.now())
// TestList(cc, Date.now())
// TestList(cc, Date.now())
// TestList(cc, Date.now())
// TestList(cc, Date.now())
// TestList(cc, Date.now())

function TestList(c, d){
  c.add(new Date(d))
  console.log(c.count())
}

//debug
// add("2019-4-3")
// add(Date())
// add(Date())
// add(Date())
// add(Date())
// console.log(count(head, tail))


module.exports = {
  // head : head,
  // tail : tail,
  // add : add,
  // count : count,
  // deleteall : deleteall,
  Counter: Counter,
}
