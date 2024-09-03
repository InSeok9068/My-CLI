import { select } from '@inquirer/prompts';
import dayjs from 'dayjs';
import { chromium } from 'playwright';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const urlMap: any = {
  USERAPP: 'https://gitlab.kpcard.co.kr/palrago/palrago-userapp/-/merge_requests/new',
  API: 'https://gitlab.kpcard.co.kr/palrago/palrago-api/-/merge_requests/new',
  COMMON: 'https://gitlab.kpcard.co.kr/palrago/palrago-common/-/merge_requests/new',
  BATCH: 'https://gitlab.kpcard.co.kr/palrago/palrago-batch/-/merge_requests/new',
  ADMIN: 'https://gitlab.kpcard.co.kr/palrago/palrago-admin/-/merge_requests/new',
};

const deployAction = async () => {
  const answer = await select({
    message: '쿼리',
    choices: Object.keys(urlMap).map((key) => ({
      name: key,
      value: urlMap[key],
    })),
  });

  const browser = await chromium.launch({
    headless: false,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  });

  // 로그인
  const page = await browser.newPage();
  await page.goto('https://gitlab.kpcard.co.kr/');
  await page.locator('input#ldapmain_username').fill('dlstjr9068');
  await page.locator('input#ldapmain_password').fill('!Dlstjr246');
  await page.getByTestId('sign-in-button').first().click();
  await page.waitForTimeout(500);

  // 배포 브랜치 생성
  await page.goto(answer);
  await page.locator('button#dropdown-toggle-btn-40').click();
  await page.waitForTimeout(500);
  await page.locator('span:has-text("master")').first().click();
  await page.locator('button#dropdown-toggle-btn-48').click();
  await page.waitForTimeout(500);
  await (await page.locator('span:has-text("release/production")').all()).at(3)?.click();
  await page.getByTestId('compare-branches-button').click();
  await page.waitForTimeout(500);

  // 배포명 작성
  const nowDayjs = dayjs();
  await page.locator('#merge_request_title').fill(`${nowDayjs.month() + 1}월 ${nowDayjs.date()}일 배포`);
  await page.getByTestId('issuable-create-button').click();
  await page.waitForTimeout(500);

  // 브라우저 종료
  await page.close();
  await browser.close();
};

export { deployAction };
