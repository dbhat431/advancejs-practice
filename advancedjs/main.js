const person={
    alive:true
}
const musician={
    plays:true
}
// musician.__proto__=person;
// console.log(musician.plays);
// console.log(musician.alive);
// console.log(musician);

Object.setPrototypeOf(musician,person);
console.log(Object.getPrototypeOf(musician));
console.log(musician.__proto__);
console.log(Object.getPrototypeOf(musician)  === musician.__proto__);
console.log(musician.plays);
console.log(musician.alive);



const guitarist ={
    strings:6,
    __proto__:musician
}
console.log(guitarist.alive);
console.log(guitarist.plays);
console.log(guitarist.strings);
console.log(guitarist);

// object with getter and setter methods
const car={
    doors:2,
    seats:"vinyl",
    get seatMaterial(){
        return this.seats;
    },
    set seatMaterial(material){
        this.seats = material;
    }
}

const luxuryCar={};
Object.setPrototypeOf(luxuryCar,car);
luxuryCar.seatMaterial = "leather";
console.log(luxuryCar);
console.log(luxuryCar.doors);
console.log(car);
//walking up the chain-props and methods are not copied
console.log(luxuryCar.valueOf());



//Getting the keys of an object
console.log(Object.keys(luxuryCar));
//lopp through each object key
Object.keys(luxuryCar).forEach(key=>{
    console.log(key);
})


//But a for ..in loop includes inherited props
for(let key in luxuryCar){
    console.log(key);
}


//Object constructors

function Animal(species){
    this.species=species;
    this.eats=true;

}

Animal.prototype.walks = function(){

    return `A $(this.species) is walking.`;
};

const Bear=new Animal("bear");
console.log(Bear.species);
console.log(Bear.walks());

//The prototype property is where inheritable props and methods are
console.log(Bear.__proto__);
console.log(Bear.__proto__ === Animal.prototype);
console.log( Animal.prototype);
console.log(Bear);


//Now an ES6 classes example of inheritance
class Vehicle{
    constructor(){
        this.wheels=4,
         this.motorized = true
    }
    ready(){
        return "Ready to go!";
    }
}


class Motorcycle extends Vehicles{
    constructor(){
        super();
        this.wheels = 2
    }
    wheelie(){
        return "On one wheel now!";
    }
}

const myBike = new Motorcycle();
console.log(myBike);
console.log(myBike.wheels);
console.log(myBike.ready());
console.log(myBike.wheelie());



const myTruck = new Vehicle();
console.log(myTruck);