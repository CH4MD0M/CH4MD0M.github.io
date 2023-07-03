---
title: 'TypeScript: 인터페이스(Interface)'
category: typescript
date: 2023-03-07
tags:
  - 인덱스시그니처
  - readonly
---

인터페이스는 객체의 형태를 정의하는 또 다른 방법이다. 인터페이스는 타입 별칭과 여러 면에서 유사하지만, 일반적으로 더 읽기 쉬운 오류 메시지, 더 빠른 컴파일러 성능, 클래스와의 더 나은 상호 운용성을 위해 선호된다.

# 타입 별칭 vs. 인터페이스

**타입 별칭(type alias)**과 **인터페이스(interface)**는 타입을 정의하고 재사용할 수 있도록 도와주지만, 사용하는 방법과 목적 등에 차이가 있다.

다음은 객체 타입을 타입 별칭으로 구현한 간략한 구문이다.

```ts
type User = {
  id: number;
  name: string;
  age: number;
};
```

다음은 인터페이스로 구현한 구문이다.

```ts
interface User {
  id: number;
  name: string;
  age: number;
}
```

인터페이스와 타입 별칭은 기본적으로 같은 역할을 수행하지만, 몇 가지 차이점이 있다.

- 인터페이스는 속성 증가를 위해 병합할 수 있다. 이 기능은 내장된 전역 인터페이스 또는 npm 패키지와 같은 외부 코드를 사용할 때 특히 유용하다.
- 인터페이스는 클래스가 선언된 구조의 타입을 확인하는데 사용할 수 있지만 타입 별칭은 사용할 수 없다.
- 일반적으로 인터페이스에서 타입스크립트 타입 검사기가 더 빨리 작동한다. 인터페이스는 타입 별칭이 하는 것처럼 새로운 객체 리터럴의 동적인 복사 붙여넣기보다 내부적으로 더 쉽게 캐시 할 수 있는 명명된 타입을 선언한다.
- 인터페이스는 이름 없는 객체 리터럴의 별칭이 아닌 이름이 있는 객체로 간주하므로 어러운 특이 케이스에서 나타나는 오류 메시지를 좀 더 쉽게 읽을 수 있다.

# 속성 타입

### 선택적 속성

객체 타입과 마찬가지로 모든 객체가 필수적으로 인터페이스 속성을 가질 필요는 없다. 타입 애너테이션 `?:`을 사용해 인터페이스의 속성이 선택적 속성임을 나타낼 수 있다.

```ts
interface Book {
  author?: string;
  pages: number;
}

const ok: Book = {
  author: 'Rita Dove',
  pages: 80,
};

const missing: Book = {
  pages: 80,
};
```

`undefined`를 포함한 유니언 타입의 선택적 속성 사이의 차이점과 관련된 주의 사항은 객체 타입뿐만 아니라 인터페이스에도 적용된다.

### 읽기 전용 속성

타입스크립트는 속성 이름 앞에 `readonly` 키워드를 추가해 다른 값으로 설정될 수 없음을 나타낸다. 이러한 `readonly` 속성은 평소대로 읽을 수 있지만 새로운 값으로 재할당하지 못한다.

**readonly 제한자는 타입 시스템에만 존재하면 인터페이스에서만 사용할 수 있다.**

```ts
interface Page {
  readonly text: string;
}

function read(page: Page) {
  console.log(page.text); // Ok

  page.text += '!';
  // Error: Cannot assign to 'text' because it is a read-only property.
}
```

### 함수와 메서드

타입스크립트는 인터페이스 멤버를 함수로 선언하는 두 가지 방법을 제공한다.

- **메서드 구문:** 인터페이스 멤버를 member(): void와 같이 객체의 멤버로 호출되는 함수로 선언
- **속성 구문:** 인터페이스 멤버를 member: () ⇒ void와 같이 독립 함수와 동일하게 선언

다음 코드의 **method**와 **property** 멤버는 둘 다 매개변수 없이 호출되어 `string`을 반환한다.

```ts
interface FunctionTypes {
  property: () => string;
  method(): string;
}

const foo: FunctionTypes = {
  property: () => '',
  method() {
    return '';
  },
};

foo.property(); // Ok
foo.method(); // Ok
```

두 가지 방법 모두 선택적 속성 키워드인 `?`를 사용해 필수로 제공하지 않아도 되는 멤버로 나타낼 수 있다.

```ts
interface FunctionTypes {
  property?: () => string;
  method?(): string;
}
```

메서드와 속성 선언은 대부분 서로 교환하여 사용할 수 있다. 주요 차이점은 다음과 같다.

- 메서드는 readonly로 선언할 수 없지만, 속성은 가능하다.
- 인터페이스 병합은 메서드와 속성을 다르게 처리한다.
- 일부 작업은 메서드와 속성을 다르게 처리한다.

현시점에서 추천하는 스타일 가이드는 다음과 같다.

- 기본 함수가 this를 참조할 수 있다는 것을 알고 있다면 메서드 함수를 사용한다. 가장 일반적으로 클래스의 인스턴스에서 사용된다.
- 반대의 경우는 속성 함수를 사용한다.

### 호출 시그니처

인터페이스와 객체 타입은 **호출 시그니처(call signature)**로 선언할 수 있다. 호출 시그니처는 값을 함수처럼 호출하는 방식에 대한 타입이다. 호출 시그니처는 타입스크립트에서 함수의 타입을 지정할 때 사용하는 문법이다. 함수에 함수를 인수로 전달하거나, 함수를 반환하는 경우 이 문법을 통해 인수나 반환 함수의 타입을 지정할 수 있다.

```ts
interface CallSignature {
  (input: string): number;
}

// 타입 (input: string) => number
const foo: CallSignature = input => input.length;
```

### 인덱스 시그니처

임의의 string 키에 값을 저장하기 객체를 생성할 때, 모든 가능한 키에 대한 인터페이스를 선언하는 것은 비현실적이거나 불가능하다.

타입스크립트는 **인덱스 시그니처(index signature)** 구문을 제공해 인터페이스의 객체가 임의의 키를 받고, 해당 키 아래의 특정 타입을 반환할 수 있도록 한다.

```ts
interface WordCounts {
  [i: string]: number;
}

const counts: WordCounts = {
  apple: 0,
  banana: 1,

  cherry: false,
  // Type 'boolean' is not assignable to type 'number'.
};
```

### 속성과 인덱스 시그니처 혼합

인덱스 시그니처를 사용하면, 객체에 동적으로 속성을 추가할 수 있다. 이는 속성의 이름이 컴파일 타임에 알려지지 않기 때문에, 문자열 또는 숫자 인덱스를 사용하여 속성에 접근할 수 있게 해준다.

하지만, 이때 인덱스 시그니처에서는 문자열 또는 숫자 인덱스 이외의 다른 타입은 허용되지 않는다. 즉, 인덱스 시그니처를 통해 동적으로 추가되는 모든 속성의 타입은 인덱스 시그니처에서 지정한 타입들과 일치해야 한다.

```ts
// Ok
interface User {
  name: string;
  age: number;
  [key: string]: string | number;
}
```

위 코드에서는 `name`과 `age` 속성을 정의한 후, 문자열 인덱스 시그니처를 사용하여 추가적인 속성들에 대한 타입을 정의한다. 이때, 추가적인 속성들의 타입은 `string` 또는 `number`로 제한되어 있다.

하지만, 이 방법의 문제점은 모든 속성이 `string` 또는 `number` 타입으로 제한된다는 점이다. 만약 명명된 속성의 타입이 인덱스 시그니처에 할당될 수 있는 경우 특정 속성에 대해 더 구체적인 타입을 지정해서 인덱스 시그니처의 타입으로 제한되는 것을 피할 수 있다.

```ts
interface Product {
  category: 'food';
  [key: string]: string;
}

const product1: Product = {
  category: 'food',
  price: '1',
  quantitiy: '100',
};

const product2: Product = {
  category: 'toy',
  // Error: Type '"toy"' is not assignable to type '"food"'.
};
```

### 중첩 인터페이스

객체 타입이 다른 객체 타입의 속성으로 중첩될 수 있는 것처럼 인터페이스 타입도 자체 인터페이스 타입 또는 객체 타입을 속성으로 가질 수 있다.

```ts
interface Novel {
  author: {
    name: string;
  };
  setting: Setting;
}

interface Setting {
  place: string;
  year: number;
}

let myNovel: Novel;

// Ok
myNovel = {
  author: {
    name: 'Jane Austen',
  },
  setting: {
    place: 'England',
    year: 1812,
  },
};
```

# 인터페이스 확장

타입스크립트는 인터페이스가 다른 인터페이스의 모든 멤버를 복사해서 선언할 수 있는 **확장된(extend) 인터페이스**를 허용한다. 확장할 인터페이스의 이름 뒤에 `extends` 키워드를 추가해서 다른 인터페이스를 확장한 인터페이스라는 걸 표시한다.

파생 인터페이스로 생성한 객체는 기본 인터페이스의 모든 멤버도 가져야 한다는 것을 타입스크립트에 알린다.

```ts
interface Writing {
  title: string;
}

interface Novella extends Writing {
  pages: number;
}

// Ok
const myNovella: Novella = {
  pages: 123,
  title: 'Ethan Frome',
};

const missingPages: Novella = {
  // Error: Property 'pages' is missing in type '{ title: string; }'
  // but required in type 'Novella'.
  title: 'The Awakening',
};
```

### 재정의된 속성

파생 인터페이스는 다른 타입으로 속성을 다시 선언해 기본 인터페이스의 속성을 **재정의(override)** 하거나 대체할 수 있다.

속성을 재선언하는 대부분의 파생 인터페이스는 해당 속성을 유니언 타입의 더 구체적인 하위 집합으로 만들거나 속성을 기본 인터페이스의 타입에서 확장된 타입으로 만드는 데 사용한다.

```ts
interface NullableName {
  name: string | null;
}

interface NonNullableName extends NullableName {
  name: string;
}

interface NumericName extends NullableName {
  // Interface 'NumericName' incorrectly extends interface 'NullableName'.
  //  Types of property 'name' are incompatible.
  //    Type 'string | number' is not assignable to type 'string | null'.
  //      Type 'number' is not assignable to type 'string'.
  name: string | number;
}
```

### 다중 인터페이스 확장

**타입스크립트의 인터페이스는 여러 개의 다른 인터페이스를 확장해서 선언할 수 있다.** 파생 인터페이스 이름에 있는 extends 키워드 뒤에 쉼표로 인터페이스 이름을 구분해 사용하면 된다.

```ts
interface GiveNumber {
  giveNumber(): number;
}

interface GiveString {
  giveString(): string;
}

interface GiveBothAndEither extends GiveNumber, GiveString {
  giveEither(): number | string;
}

function useGiversBoth(instance: GiveBothAndEither) {
  instance.giveEither(); // string | number
  instance.giveNumber(); // number
  instance.giveString(); // string
}
```

여러 인터페이스를 확장하는 방식으로 인터페이스를 사용하면 코드 중복을 줄이고 다른 코드 영역에서 객체의 형태를 더 쉽게 재사용할 수 있다.

# 인터페이스 병합

인터페이스의 중요한 특징 중 하나는 서로 병합하는 능력이다. **두 개의 인터페이스가 같은 이름으로 같은 스코프에 선언된 경우, 선언된 모든 필드를 포함하는 더 큰 인터페이스가 코드에 추가된다.**

```ts
interface Merged {
  fromFirst: string;
}

interface Merged {
  fromSecond: number;
}

// 다음과 같음
// interface Merged {
//   fromFirst: string;
//   fromSecond: number;
// }
```

일반적인 타입스크립트 개발에서 인터페이스 병합을 자주 사용하지는 않는다. 인터페이스가 여러 곳에 선언되면 코드를 이해하기 어려워지므로 _가능하면 인터페이스 병합을 사용하지 않는 것이 좋다._

### 이름이 충돌되는 멤버

병합된 인터페이스는 **타입이 다른 같은 이름의 속성을 여러 번 선언할 수 없다.** 속성이 이미 인터페이스에 선언되어 있다면 나중에 병합된 인터페이스도 같은 타입을 사용해야 한다.

```ts
interface Merged {
  same: (input: boolean) => string;
  different: (input: string) => number;
}

interface Merged {
  same: (input: boolean) => string; // Ok
  different: (input: number) => number;
  // Error: Subsequent property declarations must have the same type.
  // Property 'different' must be of type '(input: string) => number',
  // but here has type '(input: number) => number'.
}
```

그러나 병합된 인터페이스는 **같은 이름과 다른 시그니처를 가진 메서드는 정의할 수 있다.** 이렇게 하면 메서드에 대한 함수 오버로드가 발생한다.

> **✍🏻 시그니처(signature)**
>
> 타입스크립트에서 시그니처(signature)란, 함수나 메서드의 타입을 정의하는 부분으로, 매개변수와 반환값에 대한 타입을 나타낸다.

```ts
interface Merged {
  different(input: string): number;
}

interface Merged {
  different(input: number): number; //Ok
  // (method) Merged.different(input: number): number (+1 overload)
}
```

<br />

---

# 참고

- https://typescript-kr.github.io/
- 러닝 타입스크립트

```ts
function 뭐시깽1(input?: string) {}
function 뭐시깽2(input: string | undefined) {}
```
