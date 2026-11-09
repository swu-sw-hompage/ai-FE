# 서울여자대학교 인공지능전공 홈페이지 (프론트엔드)

소프트웨어학과 홈페이지(swu_homepage)를 복사해 시작한 프로젝트입니다.

```bash
npm install
VITE_USE_MOCK=true npm run dev   # 백엔드 없이 샘플 공지로 실행
```

- 교과목 내용은 `src/data/courses.js`, 교수진은 `src/data/faculty.js`에서 수정합니다.
- 실제 백엔드에 연결할 때는 `.env`의 `VITE_API_BASE_URL`을 설정하고 `VITE_USE_MOCK`을 끕니다.
