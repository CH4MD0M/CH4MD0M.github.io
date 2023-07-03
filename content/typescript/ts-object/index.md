---
title: 'TypeScript: 객체 타입'
category: typescript
date: 2023-02-24
tags:
  - 교차타입
  - 판별된유니언
---

# 객체 타입

`{…}` 구문을 사용해서 객체 리터럴을 생성하면, 타입스크립트는 해당 속성을 기반으로 새로운 객체 타입 또는 타입 형태를 고려한다.

```ts
const poet = {
  born: 1935,
  name: 'Mary Oliver',
};

poet['born']; // born: number
poet.name; // name: string

poet.end;
// Error: Property 'end' does not exist on type '{ born: number; name: string; }'.
```

### 객체 타입 선언

객체 타입은 객체 리터럴과 유사하게 보이지만 필드 값 대신 타입을 사용해 설명한다.

```ts
let poetLater: {
  born: number;
  name: string;
};

poetLater = {
  born: 1935,
  name: 'Mary Oliver',
};
```

### 별칭 객체 타입

각 객체 타입에 타입 별칭을 할당해 사용하는 방법이 더 일반적이다.

```ts
type Poet = {
  born: number;
  name: string;
};

let poetLater: Poet;

// Ok
poetLater = {
  born: 1935,
  name: 'Mary Oliver',
};

poetLater = 'Emily Dickinson';
// Error: Type 'string' is not assignable to type 'Poet'.
```

# 구조적 타이핑

### 사용 검사

객체 타입으로 애너테이션된 위치에 값을 제공할 때 타입스크립트는 값을 해당 객체 타입에 할당할 수 있는지 확인한다. 할당하는 값에는 객체 타입의 필수 속성이 있어야 한다. 객체 타입에 필요한 멤버가 객체에 없다면 타입 오류가 발생한다.

```ts
type FirstAndLastNames = {
  first: string;
  last: string;
};

const hasBoth: FirstAndLastNames = {
  first: 'Sarojini',
  last: 'Naidu',
};

const hasOnlyOne: FirstAndLastNames = {
  // Error: Property 'last' is missing in type '{ first: string; }'
  // but required in type 'FirstAndLastNames'.
  first: 'Sappho',
};
```

객체 타입은 필수 속성 이름과 해당 속성이 예상되는 타입을 모두 지정한다. 객체의 속성이 일치하지 않으면 타입 오류가 발생한다.

```ts
type TimeRange = {
  start: Date;
};

const hasStartString: TimeRange = {
  start: '2023-01-01',
  // Error: Type 'string' is not assignable to type 'Date'.
};
```

### 초과 속성 검사

변수가 객체 타입으로 선언되고, 초깃값에 객체 타입에 정의된 것보다 많은 필드가 있다면 타입 오류가 발생한다.

```ts
type Poet = {
  born: number;
  name: string;
};

// Ok Poet의 필드와 일치함
const poetMatch: Poet = {
  born: 1928,
  name: 'Maya Angelou',
};

const extraProperty: Poet = {
  born: 1935,
  name: 'Mary Oliver',
  activity: 'walking',
  // Error: Type '{ born: number; name: string; activity: string; }'
  // is not assignable to type 'Poet'.
  //   Object literal may only specify known properties,
  //   and 'activity' does not exist in type 'Poet'.
};
```

**초과 속성 검사는 객체 타입으로 선언된 위치에서 생성되는 객체 리터럴에 대해서만 일어난다.** 기존 객체 리터럴을 제공하면 초과 속성 검사를 우회할 수 있다.

```ts
const extraProperty = {
  born: 1935,
  name: 'Mary Oliver',
  activity: 'walking',
};

const extraPropertyButOk: Poet = extraProperty; // Ok
```

### 중첩된 객체 타입

자바스크립트 객체는 다른 객체의 멤버로 중첩될 수 있으므로 타입스크립트의 객체 타입도 타입 시스템에서 중첩된 객체 타입을 나타낼 수 있어야 한다.

아래 코드에서 `poemMismatch`는 author 속성에 firstName, lastName 대신 name을 포함하므로 할당할 수 없다.

```ts
type Poem = {
  author: {
    firstName: string;
    lastName: string;
  };
  name: string;
};

const poemMatch: Poem = {
  author: {
    firstName: 'Sylvia',
    lastName: 'Plath',
  },
  name: 'Lady Lazarus',
};

const poemMismatch: Poem = {
  author: {
    name: 'Sylvia Plath',
    // Error: Type '{ name: string; }' is not assignable
    // to type '{ firstName: string; lastName: string; }'.
    //   Object literal may only specify known properties,
    //   and 'name' does not exist in type '{ firstName: string; lastName: string; }
  },
  name: 'Tulips',
};
```

Poem 타입을 작성할 때 author 속성의 형태를 별칭 객체 타입으로 추출하는 방법도 있다. 중첩된 타입을 타입 별칭으로 추출하면 타입 오류 메시지에 더 많은 정보를 담을 수 있다.

```ts
type Author = {
  firstName: string;
  lastName: string;
};

type Poem = {
  author: Author;
  name: string;
};

const poemMismatch: Poem = {
  author: {
    name: 'Sylvia Plath',
    // Error: Type '{ name: string; }' is not assignable to type 'Author'.
    //   Object literal may only specify known properties,
    //   and 'name' does not exist in type 'Author'.
  },
  name: 'Tulips',
};
```

### 선택적 속성

모든 객체에 객체 타입 속성이 필요한 것은 아니다. 타입의 속성 애너테이션에서 `?:` 를 사용하면 선택적 속성임을 나타낼 수 있다.

```ts
type Book = {
  author?: string;
  pages: number;
};

const ok: Book = {
  author: 'Rita Dove',
  pages: 80,
};

const missing: Book = {
  author: 'Rita Dove',
  // Error: Property 'pages' is missing in type
  // '{ author: string; }' but required in type 'Book'.
};
```

선택적 속성과 undefined를 포함한 유니언 타입의 속성은 다르다. `?`를 사용해 선택적으로 선언된 속성은 존재하지 않아도 되지만, 필수로 선언된 속성과 `| undefined`는 그 값이 undefined일지라도 반드시 존재해야 한다.

```ts
type Writers = {
  author: string | undefined;
  editor?: string;
};

const hasRequired: Writers = {
  author: undefined,
};

const missingRequired: Writers = {};
// Error: Property 'author' is missing in type '{}'
// but required in type 'Writers'.
```

# 객체 타입 유니언

### 유추된 객체 타입 유니언

변수에 여러 객체 타입 중 하나가 될 수 있는 초깃값이 주어지면 타입스크립트는 해당 타입을 객체 타입 유니언으로 유추한다. 객체 타입에 정의된 각각의 가능한 속성은 비록 초깃값이 없는 **선택적 타입**이지만 각 객체 타입의 구성 요소로 주어진다.

다음 shape 값은 항상 boolean 타입인 `isFigure` 속성을 가지며 `size`와 `width`, `height` 속성은 있을 수도 있고 없을 수도 있다.

```ts
const shape =
  Math.random() > 0.5
    ? { isFigure: true, size: 2 }
    : { isFigure: true, width: 3, height: 4 };

shape.isFigure; // isFigure: boolean
shape.size; // size?: number | undefined
shape.width; // width?: number | undefined
```

### 명시된 객체 타입 유니언

객체 타입의 조합을 명시하면 객체 타입을 더 명확히 정의할 수 있다. 특히 값의 타입이 객체 타입으로 구성된 유니언이라면 타입스크립트의 타입 시스템은 이런 모든 유니언 타입이 존재하는 속성에 대한 접근만 허용한다.

다음 코드를 보면 `isFigure`속성에 접근하는 것은 `isFigure`가 항상 존재하기 때문에 허용되지만 `size`와 `width`, `height`는 항상 존재한다는 보장이 없다.

```ts
type Square = {
  isFigure: boolean;
  size: number;
};

type Rectangle = {
  isFigure: boolean;
  width: number;
  height: number;
};

type Shape = Square | Rectangle;

const shape: Shape =
  Math.random() > 0.5
    ? { isFigure: true, size: 2 }
    : { isFigure: true, width: 3, height: 4 };

shape.isFigure;

shape.size;
// Error: Property 'size' does not exist on type 'Shape'.
//   Property 'size' does not exist on type 'Rectangle'.

shape.width;
// Error: Property 'width' does not exist on type 'Shape'.
//   Property 'width' does not exist on type 'Square'.
```

리터럴 타입이나 원시 타입 모두, 혹은 둘 중 하나로 이루어진 유니언 타입에서 모든 타입에 존재하지 않은 속성에 접근하기 위해 타입을 좁혀야 하는 것처럼 **객체 타입 유니언도 타입을 좁혀야 한다.**

### 객체 타입 내로잉

**in 연산자**는 특정 속성이나 메서드를 가졌는지에 따라 개체의 유형을 좁힐 수 있는 타입 가드이다. in 연산자는 개체에 지정된 속성 또는 메서드가 있는지를 나타내는 boolean 값을 반환한다.

```ts
if ('size' in shape) console.log(`square: ${shape.size * shape.size}`);
else console.log(`rectangle: ${shape.width * shape.height}`);
```

타입스크립트는 객체 타입 유니언에서 if(shape.size)와 같은 형식으로 참 여부를 확인하는 것을 허용하지 않는다. (타입 가드를 목적으로 사용해도) 존재하지 않는 객체의 속성에 접근하려는 시도로 취급되기 때문이다.

```ts
if (shape.size) {
  /* ... */
}
// Error: Property 'size' does not exist on type 'Shape'.
//   Property 'size' does not exist on type 'Rectangle'.
```

### 판별된 유니언

**판별된 유니언(discriminated union)**은 유니언 타입의 다른 멤버들을 구별하기 위해 판별자라고 불리는 공통 속성을 사용하는 것을 포함하는 타입스크립트 패턴이다.

판별된 유니언은 유니언 타입의 각 멤버(interface 또는 type)를 구별하는 데 사용되는 고유한 프로퍼티를 갖는데, 이 프로퍼티를 **판별 값**이라고 한다. 판별값은 일반적으로 문자열 리터럴 타입 또는 열거형(enum)이다.

```ts
type Square = {
  kind: 'square';
  isFigure: boolean;
  size: number;
};

type Rectangle = {
  kind: 'rectangle';
  isFigure: boolean;
  width: number;
  height: number;
};

type Shape = Square | Rectangle;

const shape: Shape =
  Math.random() > 0.5
    ? { kind: 'square', isFigure: true, size: 2 }
    : { kind: 'rectangle', isFigure: true, width: 3, height: 4 };

if (shape.kind === 'square') console.log(`square: ${shape.size * shape.size}`);
else console.log(`rectangle: ${shape.width * shape.height}`);

shape.kind; //  kind: "square" | "rectangle"

shape.width;
// Error: Property 'width' does not exist on type 'Shape'.
//   Property 'width' does not exist on type 'Square'.
```

# 교차 타입

`&` 교차 타입(intersection type)을 사용하면 여러 타입을 동시에 나타낼 수 있다. 교차 타입은 일반적으로 여러 기존 객체 타입을 별칭 객체 타입으로 결합해 새로운 타입을 생성한다.

```ts
type ArtWork = {
  genre: string;
  name: string;
};

type Writing = {
  pages: number;
  name: string;
};

type WrittenArt = ArtWork & Writing;

// 다음과 같음.
// {
//     genre: string;
//     name: string;
//     pages: number;
// }
```

### 교차 타입의 위험성

교차 타입은 유용한 개념이지만, 타입스크립트 컴파일러를 혼동시키는 방식으로 사용하기 쉽다. 따라서 교차 타입을 사용할 때는 가능한 한 코드를 간결하게 유지해야 한다.

**긴 할당 가능성 오류**

유니언 타입과 결합하는 것처럼 복잡한 교차 타입을 만들게 되면 할당 가능성 오류 메시지는 읽기 어려워진다. 다시 말해 복잡하면 복잡할수록 타입 검사기의 메시지도 이해하기 더 어려워진다.

**never**

교차 타입을 잘못 사용하게 되면 불가능한 타입을 생성한다. 원시 타입의 값은 동시에 여러 타입이 될 수 없으므로 교차 타입의 구성 요소로 함께 결합할 수 없다.

두 개의 원시 타입을 함께 시도하면 **never 키워드**로 표시되는 `never` 타입이 된다.

```ts
type NotPossible = string & number;
// type NotPossible = never
```

**never 키워드**와 **never 타입**은 프로그래밍 언어에서 `bottom` 타입 또는 `empty` 타입을 뜻한다. 이는 가질 수 없고 참조할 수 없는 타입이므로 그 어떠한 타입도 제공할 수 없다.

```ts
type NotPossible = string & number;

let notNumber: NotPossible = 0;
// Error: Type 'number' is not assignable to type 'never'.

let notString: NotPossible = '';
// Error: Type 'string' is not assignable to type 'never'.
```

대부분의 타입스크립트 프로젝트는 never 타입을 거의 사용하지 않지만, 코드에서 불가능한 상태를 나타내기 위해 가끔 등장한다. 하지만 대부분 교차 타입을 잘못 사용해 발생한 실수이다.

<br />

---

# 참고

- https://typescript-kr.github.io/
- 러닝 타입스크립트
