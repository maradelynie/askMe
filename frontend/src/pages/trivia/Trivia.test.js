// import React from 'react';
// import { render } from '@testing-library/react';
// import Trivia from './index';

// test('renders learn react link', () => {
//   const { getByText } = render(<Trivia />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import {controllDifficulty,checkEnd} from "./index";

describe("controll difficulty", () =>{
  it("set",() => {
       
    expect(controllDifficulty(true,[true],"medium")).toStrictEqual({resultsArray:[],difficulty:"hard"});
    expect(controllDifficulty(true,[],"medium")).toStrictEqual({resultsArray:[true],difficulty:"medium"});
    expect(controllDifficulty(false,[true],"medium")).toStrictEqual({resultsArray:[false],difficulty:"medium"});
    expect(controllDifficulty(false,[false],"medium")).toStrictEqual({resultsArray:[],difficulty:"easy"});
    expect(controllDifficulty(false,[],"medium")).toStrictEqual({resultsArray:[false],difficulty:"medium"});
    expect(controllDifficulty(false,[false],"easy")).toStrictEqual({resultsArray:[],difficulty:"easy"});
    expect(controllDifficulty(true,[true],"hard")).toStrictEqual({resultsArray:[],difficulty:"hard"});
  })
})
describe("change page", () =>{
  it("update",() => {

    const resultsList1 = [1,2,3,4,5,6,7,8,9];
    const resultsList2 = [1,2,3,4,5,6,7,8];
    const resultsList3 = [1,2,3,4,5,6,7,8,9,10];
    const numberOfQuestions = 10;
       
    expect(checkEnd(resultsList1,numberOfQuestions)).toBe(true);
    expect(checkEnd(resultsList2,numberOfQuestions)).toBe(false);
    expect(checkEnd(resultsList3,numberOfQuestions)).toBe(true);
  })
})