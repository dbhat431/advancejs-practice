// Fnctional programming
//Here's how the compose function works:
//Start with small unary (one parameter) functions
const add2 =(x)=>x+2;
const subtract1=(x)=>x-1;
const multiplyBy5 =(x)=>x*5;


const result = multiplyBy5(subtract1(add2(4)));
console.log(result);
//The above is not compose function


//Making our own compose functions
const compose=(...fns)=>val=>fns.reduceRight((prev,fn)=>fn(prev),val);

const compResult = compose(multiplyBy5,subtract1,add2)(4);
console.log(compResult);


const pipe=(...fns)=>val=>fns.reduce((prev,fn)=>fn(prev),val);
const pipeResult=pipe(add2,subtract1,multiplyBy5)(5);
console.log(pipeResult);

const pipeResult2=pipe(
    add2,
    subtract1,
    multiplyBy5
)(6);
console.log(pipeResult2);


//This is pointer free function

const divideBy=(divisor,num)=>num/divisor;
const pipeResult3=pipe(
    add2,
    subtract1,
    multiplyBy5,
    x=>divideBy(2,x)
)(5);
console.log(pipeResult3);
const divBy = (divisor) => (num) => num/divisor;
const divideBy2=divBy(2); //partially applied


const pipeResult4=pipe(
    add2,
    subtract1,
    multiplyBy5,
    divideBy2
)(5);
console.log(pipeResult4);


const lorem="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nihil vero quod dolorem minima ex consequuntur deserunt voluptates asperiores";
const splitOnSpace =(string)=>string.split(' ');
const count =(array) => array.length;


const wordCount = pipe(
    splitOnSpace,
    count
);

console.log(wordCount(lorem));


//The pipe function is reusable
const egbdf="Every good boy does fine.";

console.log(wordCount(egbdf));


//Combine process:check for palindrome
const pal1="taco cat";
const pal2="UFO tofu";
const pal3="Dave";



const split=(string)=> string.split('');
const join=(string)=> string.join('');
const lower=(string)=> string.toLowerCase('');
const reverse=(string)=> string.reverse('');


const fwd=pipe(
    splitOnSpace,
    join,
    lower
);

const rev=pipe(
    fwd,
    split,
    reverse,
    join
);

console.log(fwd(pal1) === rev(pal1))
console.log(fwd(pal2) === rev(pal2))
console.log(fwd(pal3) === rev(pal3))



//Clone /copy functions within a pipe or compose function
//3 aproaches:
//1. Clone the object before an impure function mutates it
const scoreObj = {home : 0 , away:0};


const shallowCone = (obj) => Array.isArray(obj) ?[...obj]:{...obj};

const incrementHome=(obj)=>{
    obj.home +=1;
    return obj;

};

const homeScore =pipe(
    shallowCone,
    incrementHome
);


console.log(homeScore(scoreObj));
console.log(scoreObj);
console.log(homeScore(scoreObj)  === scoreObj);


//2. Curry the function to create a partial that is unary
let incrementHomeB=(cloneFn)=>(obj)=>{
    const newObj =cloneFn(obj);
    newObj.home+=1;
    return newObj;
}

//Creates the partial by applying the first argument in advance
incrementHomeB = incrementHomeB(shallowCone);


const homeScoreB=pipe(
    incrementHomeB
    //another function,
    //and another function,etc
);


console.log(homeScoreB(scoreObj));
console.log(scoreObj);



//3.Insert the clone function as a dependency
const incrementHomeC=(obj,cloneFn)=>{
    const newObj=cloneFn(Obj);
    newObj.home+=1;
    return newObj;
};
const homeScoreC=pipe(
    x => incrementHomeC(x,shallowCone)
);
console.log(homeScoreC(scoreObj));
console.log(scoreObj);

