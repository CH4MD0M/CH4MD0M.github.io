---
title: 'TypeScript: 배열, 튜플'
category: typescript
date: 2023-03-06
tags:
  - 배열타입
  - 튜플
  - const어서션
---

# 배열

타입스크립트는 배열의 타입 안정성을 보장하기 위해 초기 배열에 포함된 데이터 타입을 기억하고, 이후 해당 배열이 동일한 데이터 타입으로만 작업할 수 있도록 제한한다. 이를 통해 <u>배열의 일관성과 타입 안전성을 유지시킨다.</u>

```ts
const fruits = ['apple', 'banana', 'cherry'];

fruits.push('date'); // OK: 'date'는 문자열이므로 허용된다.

fruits.push(5);
// Error: Argument of type 'number' is not assignable to parameter of type 'string'.
// 'number' 타입의 인수는 'string' 타입의 매개변수에 할당할 수 없다.

console.log(fruits); // ['apple', 'banana', 'cherry', 'date']
```

위 예제에서 `fruits` 배열은 초기에 문자열 값들로 초기화되었다. 타입스크립트는 이를 기억하고 있어, 이후 문자열을 추가하는 것은 허용하지만 숫자와 같은 다른 타입의 값을 추가하려고 하면 오류를 발생시킨다.

타입스크립트가 초기 배열의 요소를 통해 배열의 타입을 유추하는 방식은 변수의 초깃값에서 타입을 유추하는 것과 유사하다. 이를 **타입 추론**이라고 하며, 개발자가 명시적으로 타입을 지정하지 않아도 타입스크립트가 자동으로 타입을 파악할 수 있게 해준다.

## 배열 타입 명시

때로는 배열의 타입을 명시적으로 지정하고 싶을 수 있다. 타입스크립트에서는 변수에 배열 타입 애너테이션을 제공하여 배열이 포함해야 하는 값의 타입을 명확히 할 수 있다.

배열에 대한 타입 애너테이션은 배열의 요소 타입 뒤에 `[]`를 붙여 표현한다.

```ts
const numbers: number[] = [1, 2, 3, 4];

const names: string[] = ['Alice', 'Bob', 'Charlie'];
```

배열 타입은 `Array<number>`와 같은 제네릭 구문으로도 작성할 수 있다. 이는 다음과 같이 사용된다.

```ts
const scores: Array<number> = [85, 92, 78, 90];

const fruits: Array<string> = ['apple', 'banana', 'cherry'];
```

### 배열과 함수 타입

배열 타입과 함수 타입을 함께 사용할 때는 **괄호**를 사용하여 타입의 경계를 명확히 해야 한다. 이는 애너테이션의 어느 부분이 함수 반환 부분이고 어느 부분이 배열 타입 묶음인지를 나타낸다.

```ts
// string 배열을 반환하는 함수 타입
let stringArrayReturner: () => string[];

// string을 반환하는 함수들의 배열 타입
let arrayOfStringReturners: (() => string)[];
```

```ts
// 사용 예시
stringArrayReturner = () => ['hello', 'world'];
console.log(stringArrayReturner()); // ["hello", "world"]

arrayOfStringReturners = [() => 'hello', () => 'world'];
console.log(arrayOfStringReturners.map(fn => fn())); // ["hello", "world"]
```

이 예제에서 `stringArrayReturner`는 호출되면 문자열 배열을 반환하는 단일 함수다. 반면 `arrayOfStringReturners`는 각각 문자열을 반환하는 여러 함수들의 배열이다.

### 유니언 타입 배열

유니언 타입과 배열을 함께 사용할 때도 괄호의 위치가 중요하다.

```ts
// string 또는 number의 배열 타입
let stringOrNumberArray: (string | number)[];

// string 배열 또는 number 타입
let stringArrayOrNumber: string[] | number;
```

```ts
// 사용 예시
stringOrNumberArray = [1, 'two', 3, 'four']; // 유효
stringOrNumberArray = [1, 2, 3, 4]; // 유효
stringOrNumberArray = ['one', 'two', 'three']; // 유효

stringArrayOrNumber = ['one', 'two', 'three']; // 유효
stringArrayOrNumber = 42; // 유효
// stringArrayOrNumber = [1, 2, 3];  // 오류: number[]는 허용되지 않음
```

`stringOrNumberArray`는 문자열과 숫자를 모두 포함할 수 있는 배열이다. 반면 `stringArrayOrNumber`는 문자열 배열이거나 단일 숫자일 수 있다.

### 배열의 any타입

초기에 빈 배열로 설정된 변수에 타입 애너테이션을 포함하지 않으면 타입스크립트는 배열을 `any[]`로 취급한다. 이는 타입 안정성을 해칠 수 있으므로 주의해야 한다.

```ts
let dangerousArray = []; // any[] 타입으로 추론됨

dangerousArray.push(1);
dangerousArray.push('two');
dangerousArray.push(false);
// 타입 검사가 무력화되어 모든 타입의 요소 추가 가능
```

### 다차원 배열

다차원 배열은 중첩된 대괄호(`[]`)를 사용하여 표현한다. 차원의 수만큼 대괄호를 추가한다.

```ts
// 2차원 숫자 배열
let matrix: number[][];

// 3차원 문자열 배열
let cube: string[][][];

// 사용 예시
matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
```

## 배열 멤버

타입스크립트는 **인덱스 기반**으로 배열의 멤버를 접근하여 해당 배열의 요소 타입을 반환하는 언어이다. 이 특성은 배열의 멤버를 안전하게 접근하고, 배열 내부의 요소에 대한 타입 정보를 추론할 수 있도록 지원한다. 즉, <u>타입스크립트는 배열의 요소 타입을 추론하기 위해 인덱스 기반 접근 방식을 활용한다.</u>

다음 str 배열은 `string[]` 타입이므로 s는 `string` 타입이다.

```ts
// fruits의 타입: string[]
const fruits = ['apple', 'banana', 'cherry'];

// firstFruit의 타입: string
const firstFruit = fruits[0];
```

이 예제에서 `fruits`는 `string[]` 타입으로 추론되며, 배열의 각 요소에 접근하면 `string` 타입이 반환된다. 따라서 `firstFruit`에는 문자열 메서드인 `toUpperCase()`를 사용할 수 있다.

### 주의 사항: 불안정한 멤버

기본적으로 타입스크립트는 모든 배열 요소에 대한 접근이 해당 배열의 멤버를 반환한다고 가정한다. 그러나 실제 자바스크립트에서는 배열의 길이를 초과하는 인덱스로 배열 요소에 접근하면, 해당 요소는 존재하지 않는 것으로 처리되어 `undefined`를 반환한다.

```ts
function printElementLength(elements: string[]) {
  console.log(elements[9001].length); // 타입 오류 없음, 하지만 런타임 에러 발생 가능
}

printElementLength(['one', 'two']);
```

타입스크립트는 검색된 배열의 멤버가 존재하는지 의도적으로 확인하지 않는다. 따라서 elements[9001]은 undefined가 아니라 string 타입으로 간주된다.

# Spread 연산자와 Rest parameter

## Spread 연산자

타입스크립트는 스프레드 연산자를 사용해 배열을 하나로 결합할 때, 두 배열의 타입이 같으면 같은 타입을 반환한다. 만약 서로 다른 타입의 배열을 결합하면 유니언 타입을 반환한다.

```ts
// 타입: string[]
const strs = ['one', 'two', 'three'];

// 타입: number[]
const nums = [1, 2, 3];

// 타입: (string | number)[]
const combined = [...strs, ...nums];
```

## Rest parameter

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

튜플은 고정된 수의 요소를 가지며, 각 요소의 타입이 미리 선언된 배열과 유사한 타입이다. 튜플을 사용하면 각 요소의 타입을 개별적으로 지정할 수 있어 더 정확한 타입 검사가 가능하다.

튜플 타입을 선언하는 구문은 배열 리터럴처럼 보이지만 요소의 값 대신 타입을 적는다.

```ts
// 튜플 선언
let person: [string, number, boolean];

// 올바른 할당
person = ['Alice', 30, true];

// 잘못된 할당 (타입 오류)
person = [30, 'Alice', true];
// Type 'number' is not assignable to type 'string'.
// Type 'string' is not assignable to type 'number'.

person = ['Alice', 30];
// Type '[string, number]' is not assignable to type '[string, number, boolean]'.
// Source has 2 element(s) but target requires 3.
```

## 선택적 튜플 요소

TypeScript 3.0부터는 튜플의 옵셔널 요소를 지원한다. 이를 통해 일부 요소가 생략될 수 있는 튜플을 정의할 수 있다.

```ts
// 선택적 요소를 가진 튜플
let optionalTuple: [string, number, boolean?];

optionalTuple = ['hello', 42, true]; // 모든 요소 포함
optionalTuple = ['world', 10]; // 마지막 요소 생략

console.log(optionalTuple[2]); // true 또는 undefined
```

## 나머지 매개변수로서의 튜플

튜플은 고정된 길이와 특정 요소 타입을 가지는 배열로 간주된다. 이러한 특성 때문에 <u>튜플은 함수에 전달할 인수를 저장하는 데 매우 유용하다.</u>

```ts
const myArray = ['hello', 123];

function greet(str: string, num: number) {
  console.log(`${str} ${num} times`);
}

greet(...myArray);
// Error: A spread argument must either have a tuple type or be passed
// to a rest parameter.
```

이 코드에서 `myArray`는 `(string | number)[]` 타입으로 추론된다. 그러나 `greet` 함수는 `string`과 `number` 타입의 두 개의 개별 인수를 기대한다. 따라서 배열 전체를 스프레드 연산자(...)로 전달하면 타입 불일치 오류가 발생한다.

<br/>

#### 배열 요소 개별 전달

```ts
// 배열의 요소를 개별적으로 전달
const myArray = ['hello', 123];
greet(myArray[0], myArray[1]);
```

이 방법은 잘 동작하지만, 코드가 지저분해지고 배열의 길이가 변경될 수 있기 때문에 유연하지 않다.

#### 튜플 타입 사용

```ts
// 튜플 타입에 맞춰서 전달
const myTuple: [string, number] = ['hello', 123];
greet(...myTuple);
```

이 방법을 사용하면 타입스크립트는 `myTuple`이 정확히 `string`과 `number` 타입의 두 요소를 가진다는 것을 알게 되어, 스프레드 연산자를 안전하게 사용할 수 있다.

<br/>

#### 실용적인 예제(튜플을 이용한 함수 호출)

```ts
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

function makeRequest(method: HttpMethod, url: string, body?: object): void {
  // 실제 요청 로직
  console.log(`Making ${method} request to ${url}`);
  if (body) console.log('with body:', body);
}

// 튜플을 사용하여 요청 정보 저장
const getRequest: [HttpMethod, string] = [
  'GET',
  'https://api.example.com/users',
];
const postRequest: [HttpMethod, string, object] = [
  'POST',
  'https://api.example.com/users',
  { name: 'Kihoon' },
];

// 튜플을 사용하여 함수 호출
makeRequest(...getRequest);
makeRequest(...postRequest);
```

## 튜플 추론

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

# 참고

- https://typescript-kr.github.io/
- 러닝 타입스크립트
- 타입스크립트 교과서
