"use client";

import { formatDateToString, formatStringToDate, numberWithCommas } from "@/utils/format";
import { useState, useEffect } from "react";

export default function UtilsExample() {
  // 입력값 상태
  const [dateString, setDateString] = useState("20250801");
  const [rawNumber, setRawNumber] = useState("1234567");
  const [customDate, setCustomDate] = useState("2024-12-25");

  // 결과값 상태
  const [convertedDate, setConvertedDate] = useState("");
  const [currentDateStr, setCurrentDateStr] = useState("");
  const [formattedNumber, setFormattedNumber] = useState("");
  const [customDateResult, setCustomDateResult] = useState("");

  // 공통 함수 예제 실행
  useEffect(() => {
    // 문자열 → 한국어 날짜 문자열로 변환
    try {
      const koreanDate = formatStringToDate(dateString);
      setConvertedDate(koreanDate);
    } catch (error) {
      setConvertedDate("오류: " + error.message);
    }

    // 현재 날짜 → YYYYMMDD 문자열
    const nowStr = formatDateToString(new Date());
    setCurrentDateStr(nowStr);

    // 숫자 문자열 → 콤마 포맷팅
    try {
      setFormattedNumber(numberWithCommas(rawNumber));
    } catch (error) {
      setFormattedNumber("오류: " + error.message);
    }

    // 커스텀 날짜 변환
    try {
      const customDateObj = new Date(customDate);
      const customDateStr = formatDateToString(customDateObj);
      setCustomDateResult(customDateStr);
    } catch (error) {
      setCustomDateResult("오류: " + error.message);
    }
  }, [dateString, rawNumber, customDate]);

  return (
    <div className="w-full p-5 border border-gray-300 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">📝 공통 함수 예제</h2>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">✅ formatStringToDate</h3>
        <p className="mb-4">YYYYMMDD 형식의 문자열을 한국어 날짜 문자열로 변환합니다.</p>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">입력할 날짜 문자열 (YYYYMMDD 형식):</label>
          <input
            type="text"
            value={dateString}
            onChange={(e) => setDateString(e.target.value)}
            placeholder="예: 20250801"
            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <strong>변환된 한국어 날짜:</strong> {convertedDate}
        </div>

        <div className="p-3 bg-gray-50 rounded border">
          <h4 className="font-semibold mb-2">사용법:</h4>
          <pre className="text-xs">
            {`import { formatStringToDate } from "@/utils/format";

const dateString = "20250801";
const koreanDate = formatStringToDate(dateString);
console.log(koreanDate); // "2025년 08월 01일"`}
          </pre>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">✅ formatDateToString</h3>
        <p className="mb-4">Date 객체를 YYYYMMDD 형식의 문자열로 변환합니다.</p>

        <div className="mb-4">
          <strong>현재 날짜를 YYYYMMDD 문자열로 변환:</strong> {currentDateStr}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">커스텀 날짜 (Date 객체):</label>
          <input
            type="date"
            value={customDate}
            onChange={(e) => setCustomDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <strong>변환된 YYYYMMDD 문자열:</strong> {customDateResult}
        </div>

        <div className="p-3 bg-gray-50 rounded border">
          <h4 className="font-semibold mb-2">사용법:</h4>
          <pre className="text-xs">
            {`import { formatDateToString } from "@/utils/format";

const now = new Date();
const dateStr = formatDateToString(now);
console.log(dateStr); // "20250801"`}
          </pre>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">✅ numberWithCommas</h3>
        <p className="mb-4">숫자에 콤마를 추가하여 포맷팅합니다.</p>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">입력할 숫자:</label>
          <input
            type="text"
            value={rawNumber}
            onChange={(e) => setRawNumber(e.target.value)}
            placeholder="예: 1234567"
            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <strong>콤마 추가된 숫자:</strong> {formattedNumber}
        </div>

        <div className="p-3 bg-gray-50 rounded border">
          <h4 className="font-semibold mb-2">사용법:</h4>
          <pre className="text-xs">
            {`import { numberWithCommas } from "@/utils/format";

const number = 1234567;
const formatted = numberWithCommas(number);
console.log(formatted); // "1,234,567"`}
          </pre>
        </div>
      </div>

      {/* 실시간 테스트 섹션 */}
      <div className="mb-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h3 className="text-lg font-semibold mb-3">🧪 실시간 테스트</h3>
        <p className="mb-4">아래에서 직접 값을 입력하고 결과를 확인해보세요!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">날짜 변환 테스트</h4>
            <div className="mb-3">
              <label className="block mb-2 text-sm">입력 (YYYYMMDD):</label>
              <input
                type="text"
                placeholder="20241225"
                className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyUp={(e) => {
                  if (e.target.value.length === 8) {
                    try {
                      const result = formatStringToDate(e.target.value);
                      e.target.nextElementSibling.textContent = result;
                    } catch (error) {
                      e.target.nextElementSibling.textContent = "오류: " + error.message;
                    }
                  }
                }}
              />
              <div className="mt-1 text-xs text-gray-600">
                결과: <span>입력해보세요</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">숫자 포맷팅 테스트</h4>
            <div className="mb-3">
              <label className="block mb-2 text-sm">입력 (숫자):</label>
              <input
                type="text"
                placeholder="1234567"
                className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyUp={(e) => {
                  try {
                    const result = numberWithCommas(e.target.value);
                    e.target.nextElementSibling.textContent = result;
                  } catch (error) {
                    e.target.nextElementSibling.textContent = "오류: " + error.message;
                  }
                }}
              />
              <div className="mt-1 text-xs text-gray-600">
                결과: <span>입력해보세요</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 사용법 가이드 */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">📚 사용법 가이드</h3>

        <div className="mb-4">
          <h4 className="text-md font-semibold mb-2">1️⃣ Import 방법</h4>
          <pre className="text-xs p-3 bg-gray-50 rounded border overflow-x-auto">
            {`// 전체 import
import { formatDateToString, formatStringToDate, numberWithCommas } from "@/utils/format";

// 개별 import
import { formatDateToString } from "@/utils/format";
import { formatStringToDate } from "@/utils/format";
import { numberWithCommas } from "@/utils/format";`}
          </pre>
        </div>

        <div className="mb-4">
          <h4 className="text-md font-semibold mb-2">2️⃣ 실제 사용 예시</h4>
          <pre className="text-xs p-3 bg-gray-50 rounded border overflow-x-auto">
            {`// 날짜 변환 (YYYYMMDD → 한국어)
const dateStr = "20241225";
const koreanDate = formatStringToDate(dateStr);
console.log(koreanDate); // "2024년 12월 25일"

// 날짜 변환 (Date → YYYYMMDD)
const now = new Date();
const formattedDate = formatDateToString(now);
console.log(formattedDate); // "20241225"

// 숫자 포맷팅
const price = 1234567;
const formattedPrice = numberWithCommas(price);
console.log(formattedPrice); // "1,234,567"

// 컴포넌트에서 사용
function ProductCard({ price, date }) {
  return (
    <div>
      <p>가격: {numberWithCommas(price)}원</p>
      <p>등록일: {formatStringToDate(formatDateToString(date))}</p>
    </div>
  );
}`}
          </pre>
        </div>

        <div className="mb-4">
          <h4 className="text-md font-semibold mb-2">3️⃣ 에러 처리</h4>
          <pre className="text-xs p-3 bg-gray-50 rounded border overflow-x-auto">
            {`try {
  const koreanDate = formatStringToDate("20241225");
  console.log("성공:", koreanDate);
} catch (error) {
  console.error("날짜 변환 실패:", error.message);
}

try {
  const formatted = numberWithCommas("1234567");
  console.log("성공:", formatted);
} catch (error) {
  console.error("숫자 포맷팅 실패:", error.message);
}`}
          </pre>
        </div>
      </div>

      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
        <h3 className="text-lg font-semibold mb-3">⚠️ 주의사항</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>formatStringToDate:</strong> YYYYMMDD 형식의 문자열만 지원합니다 (예: "20241225") → 한국어 날짜
            문자열 반환
          </li>
          <li>
            <strong>formatDateToString:</strong> Date 객체를 입력해야 합니다 → YYYYMMDD 문자열 반환
          </li>
          <li>
            <strong>numberWithCommas:</strong> 숫자 또는 숫자 문자열을 입력하세요 → 콤마가 추가된 문자열 반환
          </li>
          <li>모든 함수는 에러 처리를 위해 try-catch로 감싸서 사용하는 것을 권장합니다</li>
        </ul>
        <p className="mt-3 text-sm text-gray-600">
          <strong>📁 공통 함수 파일:</strong> <code className="bg-gray-100 px-1 rounded">src/utils/format.js</code>
        </p>
      </div>
    </div>
  );
}
