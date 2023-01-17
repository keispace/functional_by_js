---
marp: true
paginate: true
theme: marp
header: 'Grokking Simplicity'
---

<!-- _class: lead -->
# Grokking Simplicity
<!--_footer: "used by marp" -->

---

<style scoped>
section {
    font-size: 22px;
}
.columns {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
</style>

# Table of Contents

<div class="columns">
<div>

- [Grokking Simplicity](#grokking-simplicity)
- [Table of Contents](#table-of-contents)
- [쏙쏙 들어오는 함수형 코딩](#쏙쏙-들어오는-함수형-코딩)
- [Functional Programming?](#functional-programming)
  - [but,](#but)
- [함수형 사고](#함수형-사고)
- [PART I 액션과 계산, 데이터](#part-i-액션과-계산-데이터)
- [주요 기술(개념)](#주요-기술개념)
  - [1. Action(액션)](#1-action액션)
  - [2. Calculation(계산)](#2-calculation계산)
  - [3. Data(데이터)](#3-data데이터)

</div>
<div>

- [주요 패턴](#주요-패턴)
  - [1. Copy-On-Write](#1-copy-on-write)
  - [2. Defensive Copy](#2-defensive-copy)
- [Convert to functional](#convert-to-functional)
- [주요 다이어그램](#주요-다이어그램)
  - [1. 타임라인 다이어그램](#1-타임라인-다이어그램)
  - [2. 호출 그래프](#2-호출-그래프)
  - [2. 호출 그래프(계속)](#2-호출-그래프계속)
- [계층형 설계 패턴](#계층형-설계-패턴)
  - [1. 직접구현](#1-직접구현)
  - [2. 추상화 벽](#2-추상화-벽)
  - [3. 작은 인터페이스](#3-작은-인터페이스)
  - [4. 편리한 계층](#4-편리한-계층)

</div>
</div>

---

# 쏙쏙 들어오는 함수형 코딩 

- 저자 에릭 노먼드. 20년 경력. 함수형 코딩 주도자 중 한명. 
- 이론적인 내용 보단 실무 예시를 통해 함수형 코딩/설계/사고 방식 설명하는 책. 
- https://livebook.manning.com/book/grokking-simplicity/chapter-1/1

---

# Functional Programming? 

이론적인 함수형 프로그램 정의는 
1. 순수함수* 를 사용하고 부수효과**를 피하는 것이 특징인 프로그래밍 패러다임 
   * pure function: 인자에만 의존하고 부수효과가 없는 함수. aka 수학함수
   * side effect: 함수가 리턴값 이외에 하는 모든 일
2. 부수효과 없이 순수함수만 사용하는 프로그래밍 스타일 

---

## but,

1. 부수효과는 필요하다. 
    * 부수효과는 대부분의 프로그램을 실행하는 이유. 
    * 이메일 클라이언트가 이메일을 보내는 기능(부수효과)가 없다면? 
2. 함수형 프로그래밍은 부수효과를 '잘 다룰 수' 있다. 
    * 배제하는 것이 아니라 잘 다루어야 하는 것. 
3. 함수형 프로그래밍은 실용적이다.
    * 정의는 매우 (수학적으로) 이론적이지만 실제 개발에서는 훨씬 실용적으로 
사용된다.

---

# 함수형 사고 

함수형 사고는  
__함수형 프로그래머가 소프트웨어 문제를 해결하기 위해 사용하는 기술과 생각__ 
으로 크게 두가지 개념으로 나뉨. 
1) 액션과 계산, 데이터를 구분해서 생각하는 것. 
2) 일급 추상(first-class abstraction)

---

<!-- _class: lead -->
# PART I 액션과 계산, 데이터

---
<!-- header: PART I 액션과 계산, 데이터 -->

# 주요 기술(개념)
1. 액션
2. 계산
3. 데이터

---
<!-- header: PART I 액션과 계산, 데이터 - 주요 개념 -->

### 1. Action(액션)
- 호출하는 `시점`과 `횟수`에 **의존.**
- 호출할때마다 다른 것이 나온다는 의미. 
- 부수효과를 포함함. 
- 어떤 함수에 액션이 포함되 있다면 그 함수는 액션.
- 가변 변수를 읽는 것도 액션

--- 

### 2. Calculation(계산)
- 호출 `시점`과 `횟수`와 **무관함.**
- 이론적인 순수함수. 
- 계획, 결정하는 것.
- 입력값으로 항상 동일한 출력값을 가짐

--- 

### 3. Data(데이터)
- 이벤트에 대해 기록한 사실.
- 정적이고 해석이 필요함.
- immutable(불변)한 값
- mutable한 값을 읽는 행위는 액션임. 

--- 
<!-- header: PART I 액션과 계산, 데이터 - 주요 패턴 -->
# 주요 패턴
1. Copy-On-Write
2. Defensive Copy


---

### 1. Copy-On-Write

- 값을 복사 -> 변경 -> 리턴 하는 패턴
- 값의 불변성 확보를 위해 사용함.(안전지대)
- 얕은 복사와 상태공유 활용 
- js에서는 기본적으로 CoW되지 않으므로 따로 구현필요.
``` js
export function arraySet(array, idx, value) {
    const copied = array.slice();
    copied[idx] = value;
    return copied;
}
```

---

### 2. Defensive Copy

- 위험지대(가변 데이터가 존재)-안전지대(우리가 구현한 불변 데이터) 사이의 데이터 교환시 사용
- 깊은 복사(deep copy) 활용
  - ex. 웹 API(클라-서버) 전달되는 JSON
- js 는 lodash등 라이브러리로 deep copy 적용 필요

![height:200px](https://drek4537l1klr.cloudfront.net/normand/Figures/f0150-04.jpg) ![height:200px](https://drek4537l1klr.cloudfront.net/normand/Figures/f0150-03.jpg)

---

### Comparison 

 ㅤ   | Copy on Write                 | Defensive Copy
------|:------------------------------|:--------------
When  | 통제할 수 있는 데이터 변경 시 | 신뢰할 수 없는 코드와 데이터 교환 시
Where | 안전지대 내부                 | 안전지대 경계
How   | 얕은 복사                     | 깊은 복사

---

## Convert to functional

1. 코드를 액션과 계산, 데이터로 구분
2. 액션에서 계산 분리
3. 액션에서 암묵적 입/출력 줄이기
    - 인자와 리턴을 제외한 모든 것(전역변수 IO 등)은 암묵적.
    - 컴포넌트의 모듈화(독립성) 보장.

---
<!-- header: PART I 액션과 계산, 데이터 - 주요 다이어그램 -->

# 주요 다이어그램
1. 타임라인
2. 호출 그래프

--- 
## 1. 타임라인 다이어그램 

![height:500px](https://drek4537l1klr.cloudfront.net/normand/Figures/f0025-02.jpg)
- 프로그램 흐름에 따라 아래로 진행하는 다이어그램
- `시간`에 의존적인 액션의 순서를 나타냄.
- 커팅
    - 비동기 처리를 위해 점선으로 구분. 상단 부분 작업 완료 후에 진행된다는 표시.
- part2에서 자세히..
---

## 2. 호출 그래프

![height:320px](https://drek4537l1klr.cloudfront.net/normand/Figures/f0169-01.jpg)
- 함수가 호출하는 함수, 언어기능을 목적별 레이어(계층)으로 구분 
- 같은 레이어는 같은 목적을 가져야함.
- 옆(동일 레이어) 함수 호출은 없음.
- 정답은 없으나 지속적으로 분리하려는 노력 필요. 

---

## 2. 호출 그래프(계속)

- 그래프의 위에 있을 수록 
    - 고치기 쉬움
    - 테스트 이득이 적음
    - 자주 바뀜
    - 재사용하기 어려움

---

<!-- header: PART I 액션과 계산, 데이터 - 주요 설계 패턴-->
## 계층형 설계 패턴

- 호출 그래프기준으로 설계
- 코드를 추상화 계층으로 구성. 
    - 각 계층 함수는 바로 아래 계층만 참조하며 구체적인 내용은 몰라도 됨.
1. 직접 구현
2. 추상화 벽
3. 작은 인터페이스
4. 편리한 계층

---

### 1. 직접구현

- 계층 화살표가 한단계만 내려가도록 함수를 추출하는 패턴
- 같은 레이어에서 비슷한 기능이 있다면 묶을 수 있음.
- 한 단계의 구체화 수준에 관한 문제만 해결
- 특정 구체화 단계에 집중
- Not Must. 가능한한 적용

--- 

### 2. 추상화 벽

![height:400px](https://drek4537l1klr.cloudfront.net/normand/Figures/f0204-01.jpg)
- 세부구현은 감추고 인터페이스 화 하는 것. (호출그래프의 점선 부분)
    - 라이브러리나 API.
- 벽 위는 비즈니스 로직과 같은 것. 다른 계층에 정보를 신경쓰지 않을 수 있도록 추상화
- 추상화 벽을 가로지르는 화살표는 없음. 
- 주의! 만약을 대비한 코드(wrong)

--- 

### 3. 작은 인터페이스

- 추상화 벽의 인터페이스는 가능한 한 작게 구현
- 하위 계층에 불필요한 기능이 쓸데없이 커지는 것 방지
- 추상화 벽을 작게 만들어야 하는 이유
    - 낮은 수준의 코드는 이해하기 어려움 
    - 추상화 벽의 인터페이스가 코드가 많을 수록 
      1. 구현이 변경되었을때 수정사항이 많음
      2. 더 많은 버그 유발
      3. 팀 간 조율할 것이 많음
      4. 알아야 할 것이 많아 사용하기 어려움

---

### 4. 편리한 계층

- 위 세 패턴의 적용 원칙
- 작업하는 코드가 편하다고 느낀다면 -> 패턴 적용 멈춤
- 구체적인 것을 너무 많이 알아야 하거나, 코드가 지저분하다 -> 패턴 적용 시작
- 이상적인 코드는 없음. 
- 편리한 계층은 언제 멈춰야할 것을 알려주는 것.

---

<!-- _class: lead -->
<!-- header: PART II 일급 추상-->

# PART II 일급 추상

---
<!-- _class: lead -->
# TBD

