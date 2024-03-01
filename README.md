# Project Title

<!-- 배지
![MIT License][license-shield] ![Repository Size][repository-size-shield] ![Issue Closed][issue-closed-shield] -->

<!--프로젝트 대문 이미지-->
![Project Title](./img/project-title.png)

<!-- 프로젝트 버튼
 [![Readme in English][readme-eng-shield]][readme-eng-url] [![View Demo][view-demo-shield]][view-demo-url] [![Report bug][report-bug-shield]][report-bug-url] [![Request feature][request-feature-shield]][request-feature-url] -->

<!--목차-->
# Table of Contents
- [[1] About the Project](#1-about-the-project)
  - [Features](#features)
  - [Technologies](#technologies)
- [[2] Getting Started](#2-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  <!-- - [Configuration](#configuration) -->
- [[3] Usage](#3-usage)
- [[4] Contribution](#4-contribution)
- [[5] Contact](#6-contact)
<!-- - [[7] License](#7-license) -->



# [1] About the Project
<!-- *다음 내용을 고려하여 프로젝트에 대한 **전반적인 정보**를 적으세요.*

- ❗️짧은❗️ 도입부/제작 동기
- 무슨 프로젝트인지
- 왜 이 프로젝트를 사용해야하는지 -->

- 와이파이 캠으로 입력된 영상에 대한 복합적 분석을 통해 수면 상황을 부모에게 알려, 아이의 수면 시간 동안 편안한 휴식이 가능하게 합니다.
- 기 학습된 의학 자료 및 우리 아기만의 육아 정보를 추가로 학습하여, 연령 및 상황별 적절한 육아 지식을 공부해야 할 수고로움을 줄여 줍니다.

## Features
<!-- *강조하고 싶은 **주요 기능**이나 **차별성 있는 특징**을 적으세요.*
- 최고 멋진 **README**를 쉽게 작성할 수 있도록 *이텔릭체*로 된 **가이드**를 제공
- 뱃지로 **언어 옵션**을 제공 -->
![feature](./img/features.png)


## Technologies
<!-- ***언어, 프레임워크, 주요 라이브러리**를 **버전**과 함께 나열하세요.* -->

<!-- - [Maven](https://maven.apache.org/) 3.6.3
- [MySQL](https://www.mysql.com/) 8.0
- [Spring](https://spring.io/) 2.4.3 -->
1. 활용 장비
- 클라우드 컴퓨터
- 와이파이 캠(Tapo C200)
- 스마트폰
</br>
2. 개발 환경</br></br>
    (1) 개발 도구</br>
        - Next.js : 프론트엔드 개발 프레임워크</br>
        - React.js : 프론트엔드 개발 라이브러리(분리 수면 도우미)</br>
        - Streamlit : 프론트엔드 개발 라이브러리(육아 지식 챗봇)</br>
        - Django : 웹 애플리케이션 서버 개발 프레임워크</br>
        - MediaPipe : 아이 수면 패턴 모니터링 활용 API</br>
        - OpenAI API : 육아 지식 챗봇 활용 API</br>
    </br>
    (2) OS</br>
        - Linux : Azure, AWS EC2 제공 클라우드</br>
        - Windows : 개인 PC 운영체제</br>
    </br>
    (3) 개발 언어</br>
        - Python : 백엔드 및 AI 개발 언어</br>
        - JavaScript : 프론트엔드 개발 언어</br>



# [2] Getting Started
<!-- *만약 운영체제에 따라 프로그램을 다르게 동작시켜야한다면, 운영체제별로 동작 방법을 설명하세요* -->

## Prerequisites
<!-- *프로젝트를 동작시키기 위해 필요한 소프트웨어와 라이브러리를 나열하고 어떻게 다운받을 수 있는지 설명하세요.* -->

<!-- - [OpenWeather API key](https://openweathermap.org/) (무료) -->
- npm
```bash
npm install npm@latest -g
```

## Installation
*어떻게 이 프로젝트의 소스코드를 다운받을 수 있는지 설명하세요.*
1. Repository 클론
```bash
git clone https://github.com/SeoyoungOhMe/Dr.COCO_Fly_AI.git
```
2. NPM packages 설치
```bash
npm install
```
3. build 스크립트 실행
```bash
npm run build
```
4. dev 스크립트 실행
```bash
npm run dev
```

<!-- ## Configuration
*코드의 어느 부분을 채우거나 수정해야하는지 설명하세요.*
- `config.js`에 Openweather API key를 입력
```bash
const API_KEY = "<Your API key>";
```
 -->


# [3] Usage
***스크린샷, 코드** 등을 통해 **사용 방법**과 **사용 예제**를 보여주세요. 사용 예제별로 h2 헤더로 나누어 설명할 수 있습니다.*

![usage](img/usage.png)

```java
// 몇 개의 API 사용 예제를 코드와 함께 보여주세요.
```



# [4] Contribution
<!-- 기여해주신 모든 분들께 대단히 감사드립니다.[`contributing guide`][contribution-url]를 참고해주세요. -->
- 임태규(팀장) : 백엔드
- 김선아 : 백엔드
- 김시원 : 프론트엔드
- 오서영 : 프론트엔드
- 우정아 : 백엔드
- 주동근 : 기획

<!-- 
# [5] Acknowledgement
***유사한 프로젝트의 레포지토리** 혹은 **블로그 포스트** 등 프로젝트 구현에 영감을 준 출처에 대해 링크를 나열하세요.*

- [Readme Template - Embedded Artistry](https://embeddedartistry.com/blog/2017/11/30/embedded-artistry-readme-template/)
- [How to write a kickass Readme - James.Scott](https://dev.to/scottydocs/how-to-write-a-kickass-readme-5af9)
- [Best-README-Template - othneildrew](https://github.com/othneildrew/Best-README-Template#prerequisites)
- [Img Shields](https://shields.io/)
- [Github Pages](https://pages.github.com/) -->



# [5] Contact
- 📧 ohseoyoung5@gmail.com
- 📋 [https://github.com/SeoyoungOhMe/Dr.COCO_Fly_AI.git](https://github.com/SeoyoungOhMe/Dr.COCO_Fly_AI.git)


<!-- 
# [7] License
MIT 라이센스
라이센스에 대한 정보는 [`LICENSE`][license-url]에 있습니다.
 -->


<!--Url for Badges-->
[license-shield]: https://img.shields.io/github/license/dev-ujin/readme-template?labelColor=D8D8D8&color=04B4AE
[repository-size-shield]: https://img.shields.io/github/repo-size/dev-ujin/readme-template?labelColor=D8D8D8&color=BE81F7
[issue-closed-shield]: https://img.shields.io/github/issues-closed/dev-ujin/readme-template?labelColor=D8D8D8&color=FE9A2E

<!--Url for Buttons-->
[readme-eng-shield]: https://img.shields.io/badge/-readme%20in%20english-2E2E2E?style=for-the-badge
[view-demo-shield]: https://img.shields.io/badge/-%F0%9F%98%8E%20view%20demo-F3F781?style=for-the-badge
[view-demo-url]: https://dev-ujin.github.io
[report-bug-shield]: https://img.shields.io/badge/-%F0%9F%90%9E%20report%20bug-F5A9A9?style=for-the-badge
[report-bug-url]: https://github.com/dev-ujin/readme-template/issues
[request-feature-shield]: https://img.shields.io/badge/-%E2%9C%A8%20request%20feature-A9D0F5?style=for-the-badge
[request-feature-url]: https://github.com/dev-ujin/readme-template/issues

<!--URLS-->
[license-url]: LICENSE.md
[contribution-url]: CONTRIBUTION.md
[readme-eng-url]: ../README.md

