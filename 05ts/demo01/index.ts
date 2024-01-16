class Animal<T> {
	name: T
	constructor(name: T) {
		this.name = name;
	}
}
function say<H>(ani: Animal<H>) {
	console.log(ani.name);
}
say<string>(new Animal('stribbbng'));
interface IObj {
	name?: string;
	age?: number;
	gender: 'male' | 'female';
}
interface IObj2 {
	name?: string;
	age?: number;
	gender: 1 | 0;
}
function intro<T, U>(obj: T): T {
	return obj;
}
const a = intro<IObj, IObj2>({
	name: '张三',
	age: 12,
	gender: 'male'
});
console.log(a.name);
function useState<T>(initData?: T) {
	let iData: T = initData || null; 
	function setData(data: T) {
		initData = data;
	};
	return [iData, setData];
}
const [conut, setCount] = useState<number>();
