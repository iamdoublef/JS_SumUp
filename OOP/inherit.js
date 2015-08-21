/**
 * 继承总结
 */
var util = require("util");

/**
 * 以上为nodejs的inhert函数，
 * 在继承过程中ctor.prototype = Object.create(superCtor.prototype）这段代码可以看出，
 * 子类只继承了prototype中的属性。
 * util.inherits = function(ctor, superCtor) {
 *	ctor.super_ = superCtor;
 *	ctor.prototype = Object.create(superCtor.prototype, {
 *		constructor: {
 *			value: ctor,
 *			enumerable: false,
 *			writable: true,
 *			configurable: true
 * 		}
 * 	});
 * };
 */

/**
 * 所有会产生以下误区：
 * 如果父类所有的属性（属性或函数）都写在构造函数中，则该继承则无效。如：
 */
function superClass(){
     this.a = 1;
     this.aFn = function(){
          console.info("superClass call aFn");
     }
}

function subClass(){
}

util.inherits(subClass,superClass);
var subObj = new subClass();

console.info("subObj.a == undefined : " + (typeof subObj.a === "undefined") ); //true
console.info("subObj.aFn == undefined : "+ (typeof subObj.aFn === "undefined")); //true

console.info("===========================================");


/**
 * 因此，建议需要继承的属性（包括函数）写在prototype中
 * 同时，若子类希望继承父类的构造函数，用于创建如父类的属性。
 * 	需通过在subClass沟通函数中通过superClass.call(this)进行创建新的属性备份到子类的对象作用域。
 */
function superClass1(){
    this.a = 1;
};

superClass1.prototype.aFn = function(){
    console.info("superClass call aFn");
};

function subClass1(){
	superClass1.call(this);
	this.b = 2;
};

util.inherits(subClass1,superClass1);

//继承后，增加新的属性（或函数）
subClass1.prototype.bFn  = function(){
    console.info("superClass call bFn");
};
var subObj1 = new subClass1();
console.info("subObj.a == undefined : " + (typeof subObj1.a === "undefined")); //false
console.info("subObj.aFn == undefined : "+(typeof subObj1.a === "undefined")); //false
console.info("subObj.b == undefined : " + (typeof subObj1.b === "undefined")); //false
console.info("subObj.bFn == undefined : "+(typeof subObj1.bFn === "undefined")); //false
console.info("subObj.a = " + subObj1.a ); //1

subObj1.aFn() ;//superClass call aFn
console.info("subObj.b =  " + subObj1.b);  //2
subObj1.bFn();//superClass call bFn
