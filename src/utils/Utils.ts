import Unit from "~/units/Unit";

const ARRAY_SIZE:number = 128,
	  ON_THE_FRONT:number = 0,
	  ON_THE_LEFT:number = 1,
	  ON_THE_RIGHT: number = 2,
	  RAW_LUT:Array<number> = Array.from(new Array(ARRAY_SIZE), () => Math.random() * 2 - 1),
	  NORMAL_RANDOM_LUT:Array<number>  = [...RAW_LUT],
	  ABS_LUT:Array<number>  = RAW_LUT.map(num => Math.abs(num));
	  

let indexLUT = 0;
let indexNormalLUT = 0;
let indexAbsLUT = 0;

class Utils {

	static dis(a: Point, b: Point) {
		return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
	}

	static ang(a: Point, b: Point) {
		return Math.atan2(b.y - a.y, b.x - a.x) + 1.571;// + Math.PI/2;
	}

	static rnd(a: number, b: number) : number {
		return Math.floor(Math.random()*(b-a+1))+a;
	}
	
	static objStaying(a: Unit) : boolean {
		return a.state < 6;
	}
	//in front of, on left or right
	static where(Ax: number, Ay: number, Aa: number, Bx: number, By: number, tolerancja: number) : number {
	    const ctg:number = -1/Math.tan(Aa),
	    	  Cx:number = Math.sin(Aa)+Ax,
			  Cy:number = -Math.cos(Aa)+Ay;

		if(Math.abs(ctg*Bx - By + Cy - Cx*ctg)/Math.sqrt(ctg*ctg+1)<tolerancja) return ON_THE_FRONT;
		if((Cy - By)*(Ax - Bx) + (-Cx + Bx)*(Ay - By) < 0) return ON_THE_LEFT;
		return ON_THE_RIGHT;
	}

	static removeFromArr(arr: any[], elem: any): void {
		const index: number = arr.indexOf(elem);
		if(index === -1) {//REMOVE AFTER DEVELOPMENT
			console.error("You are trying to remove element from array, but it doesn't exists is array");
			debugger;
		}
		arr.splice(index, 1);
	}


	//left or right
	static side(a: any, b: any) : number {
		const ctg:number = -1/Math.tan(a.angle),
	    	cx:number = Math.sin(a.angle)+a.x,
			cy:number = -Math.cos(a.angle)+a.y;

		if((cy - b.y)*(a.x - b.x) + (-cx + b.x)*(a.y - b.y) < 0) return ON_THE_LEFT;
		return ON_THE_RIGHT;
	}

  static getIndexOfTheNearestItem(items: Point[], point: Point) { // TODO: remove iteam instead of index
    if (items.length === 0) {
      console.error('items.length = 0 !!!')
    }
		const newarestPoint = items.reduce(
      (result, item, index) => {
        const distance = Utils.dis(item, point)
        if (distance < result.distance) {
          return { distance, index }
        }
        return result;
      },
      { index: 0, distance: Number.MAX_VALUE }
    )
		return newarestPoint.index
	}


	static calculateCenterPoint = (items: Point[]) : Point=> {
		const center = { x: 0, y: 0 };
	
		items.forEach(item => {
			center.x += item.x;
			center.y += item.y;
		});
	
		center.x /= items.length;
		center.y /= items.length;
	
		return center;
	}

	

	//---==========CREATE ARRAY WITH RANDOM NUMBERS, NEGATIVE AND POSITIVE==========---//
	
	static randomLUT(count:number): number {
		return RAW_LUT[++indexLUT % ARRAY_SIZE] * count;
	}

	static normalRandomLUT(count: number) : number {
		return NORMAL_RANDOM_LUT[++indexNormalLUT % ARRAY_SIZE] * count;
	}

	static randomAbsLUT(count:number) : number {
		return ABS_LUT[++indexAbsLUT % ARRAY_SIZE] * count;
	}
};

for(let i = 0; i < ARRAY_SIZE/3; i++) {
	NORMAL_RANDOM_LUT[Utils.rnd(0,ARRAY_SIZE - 1)] /= 2;//to normalize results, more result near zero
}

export default Utils;
