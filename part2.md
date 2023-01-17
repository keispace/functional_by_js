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
<!-- header: PART II 일급 추상-->

# PART II 일급 추상

---

# TBD

주요 함수형 함수 map reduce filter, forEach
기타 함수형 함수 

중첩데이터: 재귀함수
- 종료조건
- 재귀호출
- 종료조건에 다가가기 


타임라인
- 비동기 적 타임라인 분리하기 (타임라인 새로 그림)
- 한 단계씩 타임라인 만들기
- 스레드 모델에 따라 단순화하기 
- 그리기 방법 요약
  - 액션 확인
  - 액션 그리기 
   - 순서 / 동시
   - 단순화하기
   - 읽기
- 자원 공유 타임라인 :: 버그 가능성 
  - 전역 변수를 지역변수로 바꾸기. 
  - 전역 변수를 인자로 바꾸기 