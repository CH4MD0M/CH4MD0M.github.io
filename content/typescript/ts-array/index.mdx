---
title: 'TypeScript: 배열, 튜플'
category: typescript
date: 2023-03-06
tags:
  - 배열타입
  - 튜플
  - const어서션
---

타입스크립트는 초기 배열에 어떤 데이터 타입이 있는지 기억하고, 배열이 해당 데이터 타입에서만 동작하도록 제한한다. 이런 방식으로 **배열의 데이터 타입을 하나로 유지시킨다.**

```ts
const numbers = [1, 2, 3, 4];

numbers.push(5); // Ok

numbers.push('a');
// Error: Argument of type 'string' is not assignable to parameter of type 'number'.
```

위 코드에서 numbers 배열이 초기에 `number` 타입의 값을 포함한다는 것을 알고 있으므로 이후 `number` 타입의 값을 추가하는 것은 허용하지만 다른 타입의 값을 추가하는 것을 제한한다.

타입스크립트가 초기 배열에 담긴 요소를 통해 배열의 타입을 유추하는 방법은 변수의 초깃값에서 타입을 유추하는 것과 유사하다.

# 배열 타입

타입스크립트는 변수에 배열 타입 애너테이션을 제공해 배열이 포함해야 하는 값의 타입을 알려준다. 배열에 대한 타입 애너테이션은 배열의 요소 타입 다음에 `[]`가 와야 한다.

```ts
let array: number[];
array = [1, 2, 3, 4];
```

배열 타입은 `Array<number>` 같은 구문으로도 작성할 수 있다. 하지만 개발자 대부분은 더 간단한 `number[]`를 선호한다.

### 배열과 함수 타입

배열 타입은 함수 타입에 무엇이 있는지를 구별하는 괄호가 필요하다. 괄호는 애너테이션의 어느 부분이 함수 반환 부분이고 어느 부분이 배열 타입 묶음인지를 나타낸다.

```ts
// string 배열을 반환하는 함수 타입
let foo: () => string[];

// string 값을 반환하는 함수의 배열 타입
let bar: (() => string)[];
```

foo는 함수를 호출하면 string 배열을 반환하는 함수 타입이다. 따라서, foo를 호출하면 배열이 반환된다. 반면에 bar는 함수를 호출하면 string 값을 반환하는 함수의 배열 타입이다. 따라서, bar를 호출하면 함수가 있는 배열이 반환된다.

### 유니언 타입 배열

```ts
// string 또는 number 배열 타입
let arr1: string | number[];

// 각 요소가 string 또는 number인 배열 타입
let arr2: (string | number)[];
```

arr1은 string 또는 number 배열을 나타내는 유니온 타입이다. 따라서 arr1은 `string` 또는 `number array` 중 하나일 수 있다. arr1의 요소가 배열인 경우, 해당 배열은 숫자 배열이어야 한다. 반면에 arr2는 string 또는 number 타입을 가진 요소들의 배열을 나타내는 배열 타입이다. 따라서 arr2는 문자열과 숫자를 모두 요소로 가질 수 있다.

### 배열의 any타입

초기에 빈 배열로 설정된 변수에 타입 애너테이션을 포함하지 않으면 타입스크립트는 배열을 `any[]`로 취급한다. any 타입의 배열은 잠재적으로 잘못된 값 추가를 허용해 타입스크립트의 이점을 무력화시키게 된다.

### 다차원 배열

2차원 배열의 타입은 두개의 `[]`를 갖는다. 3차원 배열은 []를 3개, 4차원 배열은 4개를 갖는다. 그럼 그 이상의 배열에는 몇 개의 []가 필요한지 예측할 수 있다.

```ts
let arr: number[][];

arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
```

# 배열 멤버

타입스크립트는 인덱스 기반으로 배열의 멤버를 접근하여 해당 배열의 요소 타입을 반환하는 언어이다. 이는 배열의 멤버를 안전하게 접근하고, 배열 내부의 요소에 대한 타입 정보를 추론할 수 있도록 지원한다. 즉, 타입스크립트는 배열의 요소 타입을 추론하기 위해 인덱스 기반 접근 방식을 활용한다.

다음 str 배열은 `string[]` 타입이므로 s는 `string` 타입이다.

```ts
// str의 타입: string[]
const str = ['one', 'two', 'three'];

// s의 타입: string
const s = str[0];
```

### 주의 사항: 불안정한 멤버

기본적으로 TypeScript는 모든 배열 요소에 대한 접근이 해당 배열의 멤버를 반환한다고 가정한다. 그러나 실제 JavaScript에서도 배열의 길이를 초과하는 인덱스로 배열 요소에 접근하면, 해당 요소는 존재하지 않는 것으로 처리되어 undefined를 반환한다.

```ts
function foo(elements: string[]) {
  console.log(elements[9001].length); // 타입 오류 없음.
}

foo(['one', 'two']);
```

타입스크립트는 검색된 배열의 멤버가 존재하는지 의도적으로 확인하지 않는다. 따라서 elements[9001]은 undefined가 아니라 string 타입으로 간주된다.

# Spread 연산자와 Rest parameter

### Spread 연산자

타입스크립트는 스프레드 연산자를 사용해 배열을 하나로 결합할 때, 두 배열의 타입이 같으면 같은 타입을 반환한다. 만약 서로 다른 타입의 배열을 결합하면 유니언 타입을 반환한다.

```ts
// 타입: string[]
const strs = ['one', 'two', 'three'];

// 타입: number[]
const nums = [1, 2, 3];

// 타입: (string | number)[]
const combined = [...strs, ...nums];
```

### Rest parameter

나머지 매개변수의 타입은 지정한 타입 애너테이션과 같아야 한다.

다음 logUsers 함수는 …names 나머지 매개변수로 `string` 타입의 값만 받는다. 다른 타입의 값이 들어오는 것을 허용하지 않는다.

```ts
function logUsers(greeting: string, ...names: string[]) {
  for (const name of names) {
    console.log(`${greeting}, ${name}!`);
  }
}

const users = ['Tom', 'Dom', 'Kevin'];
logUsers('Hello', ...users); // Ok

const birthYear = [2020, 1990, 1999];
logUsers('Born in', ...birthYear);
// Error: Argument of type 'number' is not assignable to parameter of type 'string'.
```

# 튜플

튜플 배열은 각 인덱스에 알려진 특정 타입을 가지며 배열의 모든 가능한 멤버를 갖는 유니언 타입보다 더 구체적이다. 튜플 타입을 선언하는 구문은 배열 리터럴처럼 보이지만 요소의 값 대신 타입을 적는다.

```ts
let yearAndName: [number, string];

yearAndName = [1990, 'Tom']; // Ok

yearAndName = [false, 'Tom'];
// Error: Type 'boolean' is not assignable to type 'number'.

yearAndName = [1990];
// Type '[number]' is not assignable to type '[number, string]'.
//   Source has 1 element(s) but target requires 2.
```

### 튜플 할당 가능성

타입스크립트에서 튜플 타입은 가변 길이의 배열 타입보다 더 구체적으로 처리된다. 즉, 배열 타입은 튜플타입에 할당할 수 없다.

```ts
const array = [false, 123];

const tuple: [boolean, number] = array;
// Error: Type '(number | boolean)[]' is not assignable to type '[boolean, number]'.
//   Target requires 2 element(s) but source may have fewer.
```

타입스크립트는 배열 array의 타입을 `(number | boolean)[]`로 유추한다. 따라서 배열 array를 tuple에 할당하면 배열의 타입과 튜플의 타입이 서로 다르기 때문에 TypeScript 컴파일러가 오류를 발생시킨다.

### 나머지 매개변수로서의 튜플

튜플은 구체적인 길이와 요소 타입 정보를 가지는 배열로 간주된다. 따라서 함수에 전달할 인수를 저장하는 데 유용한다.

다음 코드의 `foo`함수 호출에서 `...`연산자를 사용하여 `myArray`을 인수로 전달하려고 시도한다. 이때 타입스크립트 컴파일러는 `myArray`가 `(string | number)[]`타입을 가진 배열임을 인식한다. 그러나 `foo`함수는 `string`과 `number`타입의 두 개의 인수를 필요로 하므로, 배열 전체를 전달하는 것은 타입이 일치하지 않는다.

```ts
const myArray = ['hello', 123];

function foo(str: string, num: number) {
  console.log(str, num);
}

foo(...myArray);
// Error: A spread argument must either have a tuple type or be passed
// to a rest parameter.
```

따라서 myArray의 요소를 개별적으로 전달하거나 튜플 타입에 맞춰서 전달해줘야 한다.

```ts
// 배열의 요소를 개별적으로 전달
const myArray = ['hello', 123];
foo(myArray[0], myArray[1]);
```

```ts
// 튜플 타입에 맞춰서 전달
const myTuple: [string, number] = ['hello', 123];
foo(...myTuple);
```

### 튜플 추론

타입스크립트는 생성된 배열을 튜플이 아닌 가변 길이의 배열로 취급한다.

```ts
function foo(input: string) {
  return [input[0], input.length];
}

// firstChar: string | number
// size: string | number
const [firstChar, size] = foo('test');
```

타입스크립트에서는 값이 일반적인 배열이 아니라 구체적인 튜플 타입이어야 함을 다음 두 가지 방법으로 나타낼 수 있다.

### 명시적 튜플 타입

함수를 튜플 타입을 반환한다고 선언하고, 배열 리터럴을 반환한다면 해당 배열 리터럴은 튜플로 간주된다.

```ts
function foo(input: string): [string, number] {
  return [input[0], input.length];
}

// firstChar: string
// size: number
const [firstChar, size] = foo('test');
```

### const assertion

명시적 타입 애너테이션에 튜플 타입을 입력하는 작업은 코드 변경에 때라 작성 및 수정을 해야된다는 불편함이 있다. 그 대안으로 타입스크립트는 **const 어서션**인 `as const` 연산자를 제공한다.

다음과 같이 배열 리터럴을 선언하고 `as const`를 사용하여 const 어서션을 추가할 수 있다.

```ts
const myTuple = ['hello', 123] as const;
```

위의 코드에서 `myTuple`은 `['hello', 123]`이라는 값을 갖는 튜플이다. `as const`를 사용하여 const 어서션을 추가하면 **타입스크립트는 이 튜플의 요소가 불변하다는 것을 보장한다.** 따라서 요소의 값을 변경하거나 튜플의 길이를 변경하는 등의 작업을 시도하면 타입스크립트 컴파일러가 에러를 발생시킨다.

```ts
myTuple[0] = 'world';
// Error: Cannot assign to '0' because it is a read-only property.

myTuple.push(456);
// Erorr: Property 'push' does not exist on type 'readonly ["hello", 123]'.
```

<br />

---

# 참고

- https://typescript-kr.github.io/
- 러닝 타입스크립트
