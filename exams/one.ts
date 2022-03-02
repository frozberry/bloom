// MockTests.com Maths 2

import { Prisma } from "@prisma/client"

const problems = [
  {
    question: "Calculate 7 x 191",
    correct: 1337,
    categories: ["multiplication and division"],
  },
  {
    question: "Calculate 456 ÷ 12",
    correct: 38,
    categories: ["addition and subtraction"],
  },
  {
    question: "Calculate √169 (the square root of 169)",
    correct: 13,
    categories: ["multiplication and division"],
  },
  {
    question: "Calculate 987 + 494",
    correct: 1481,
    categories: ["multiplication and division"],
  },
  {
    question: "Calculate 15²",
    correct: 225,
    categories: ["multiplication and division"],
  },
  {
    question: "Which number is closest to zero?",
    correct: "0.053",
    options: ["0.053", "0.06", "0.1", "0.078", "0.12"],
    categories: ["numbers"],
    multi: true,
  },
  {
    question:
      "Which of the following numbers is the Lowest Common Multiple (LCM) of 5 and 30?",
    correct: "30",
    options: ["5", "10", "6", "30", "3"],
    categories: ["numbers"],
    multi: true,
  },
  {
    question:
      "Mr Edward picked 801 of the 7,965 berries on the bushes in his garden. How many are left?",
    correct: "7164",
    categories: ["addition and subtraction"],
  },
  {
    question:
      "The Glitz Fashion shop was having a sale. Jessica bought five T-shirts for £12.89 each, four bracelets for £15.73 each, and six rings for £19.22 each. How much money did Jessica spend altogether at the shop?",
    correct: "242.69",
    unit: "£",
    categories: ["addition and subtraction", "measurement"],
  },
  {
    question:
      "Which of the following numbers is the remainder when you divide 46 by 6?",
    correct: "4",
    options: ["1", "2", "3", "4", "5", "7"],
    categories: ["multiplication and division", "fractions"],
    multi: true,
  },
  {
    question:
      "Which of the following numbers is both a triangular and a prime number?",
    correct: "3",
    options: ["2", "5", "3", "13", "29"],
    multi: true,
    categories: ["numbers"],
  },
  {
    question:
      "The cost for bowling at a certain bowling alley is £2.50 for shoes and £4.25 for each game bowled. Austin spent £15.25. How many games did Austin play?",
    correct: 3,
    categories: [
      "measurement",
      "multiplication and division",
      "addition and subtraction",
    ],
  },
  {
    question:
      "Calvin has 25 comic books and he wants to give Robbie 3/5th of them. How many will Calvin give to Robbie?",
    correct: 15,
    categories: ["ratio and proportion"],
  },
  {
    question:
      "I am thinking of a number. I multiply my number by 7 and subtract 5. My answer is 51. What is the number that I am thinking of?",
    correct: "8",
    categories: ["algebra"],
  },
  {
    question:
      "George and Tiffany each have a bag of marbles. George has 912 marbles. Tiffany has 387 marbles. How many more marbles does George have than Tiffany?",
    correct: "525",
    categories: ["addition and subtraction"],
  },
  {
    question:
      "Write the following number as a decimal number. 76 + 4 + ²⁄₁₀ + ⁸⁄₁₀₀",
    correct: "80.28",
    categories: ["numbers", "fractions"],
  },
  {
    question: "Which of the following fractions is closest to 1/5?",
    correct: "6/25",
    options: ["1/2", "5/10", "3/4", "6/25", "3/8"],
    multi: true,
    categories: ["fractions"],
  },
  {
    question:
      "At the local library, 76 books were returned on the 1st day of the week, of which 24 were overdue. What fraction of the books returned were overdue?",
    correct: "6/19",
    options: ["6/19", "6/25", "3/8", "5/11", "6/15"],
    multi: true,
    categories: ["fractions"],
  },
  {
    question:
      "What is the new price of a bike which normally costs £75 but is reduced by 20% in the sale?",
    correct: "60",
    unit: "£",
    categories: ["measurement", "ratio and proportion"],
  },
  {
    question: "If 3b + 8 = 9b - 16. What is the value of b?",
    correct: "4",
    categories: ["algebra"],
  },
  {
    question:
      "Which mathematical symbol can be placed in the middle of the fractions below?",
    correct: ">",
    options: [">", "<", "="],
    img: "https://i.imgur.com/WSXKiOw.png",
    multi: true,
    categories: ["fractions"],
  },
  {
    question:
      "37 out of 50 pupils in a school said they have a Nintendo Switch at home. What percentage is this?",
    correct: 74,
    unit: "%",
    categories: ["ratio and proportion"],
  },
  //   {
  //     question: "What percentage of this grid is shaded?",
  //     correct: "correctcorrectcorrect",
  //     unit: "%",
  //   },
  {
    question:
      "Bob's school sold 300 tickets for a raffle. 4% of the tickets won a prize. How many tickets did not win a prize?",
    correct: 288,
    categories: ["ratio and proportion"],
  },
  {
    question: "Which answer of the following is different from the others?",
    correct: "30% of £75",
    options: [
      "50% of £50",
      "25% of £100",
      "⅝ of £40",
      "30% of £75",
      "10% of £250",
    ],
    multi: true,
    categories: ["ratio and proportion", "measurement"],
  },
  {
    question:
      "Mark has just built a model aeroplane with a scale of 1:72. The model is 20cm long. How long is the actual aeroplane?",
    correct: 14.4,
    unit: "metres",
    categories: ["ratio and proportion"],
  },
  {
    question:
      "During a TV quiz game, the questions are answered correctly by presenters Ant and Dec in the ratio of 5:4. If Ant answered 20 questions right, how many questions did Ant and Dec answer correctly in total?",
    correct: 36,
    categories: ["ratio and proportion"],
  },
  {
    question:
      "The graph shows the number of complaint letters received by the local country council over a period of five weeks. What is the range of quantities of letters received?",
    correct: 150,
    img: "https://i.imgur.com/IwrxYJu.png",
    categories: ["statistics"],
  },
  {
    question:
      "In the graph above, how many more complaint letters were received in week 1 than in week 5?",
    correct: 100,
    categories: ["statistics"],
  },
  {
    question:
      "In the graph above, what is the mean number of complaint letters received in a  week?",
    correct: 150,
    categories: ["statistics"],
  },
  {
    question:
      "During the half term holidays, Tina took 7 spelling tests. Here are the results out of 20. What was her mean score?",
    img: "https://i.imgur.com/24MXc1U.png",
    correct: 15,
    categories: ["statistics"],
  },
  {
    question: "What was Tina's median scores in the spelling tests?",
    correct: 14,
    categories: ["statistics"],
  },
  //   {
  //     question:
  //       "There are 30 children in a class. 16 girls and boys. One child's name is chosen at random to become a class prefect. What is the chance the child will be a boy?",
  //     correct: "correctcorrectcorrect",
  //   },
  //   {
  //     question: "Which of these nets will fold to form a square based pyramid?",
  //     correct: "correctcorrectcorrect",
  //     options: ["A", "B", "C", "D", "E"],
  //     multi: true,
  //   },
  {
    question: "What is the perimeter of the following shape?",
    correct: 26,
    unit: "cm",
    img: "https://i.imgur.com/YELCAJ2.png",
    categories: ["geometry"],
  },
  {
    question: "What is the area of the above shape?",
    correct: 35,
    unit: "cm²",
    categories: ["geometry"],
  },
  {
    question: "What is the size of angle 'a' in the diagram?",
    correct: 135,
    img: "https://i.imgur.com/eVhNi0t.png",
    unit: "°",
    categories: ["geometry"],
  },
  // {
  //   question: "Find the volume of this cuboid in cubic centimetres.",
  //   correct: "correctcorrectcorrect",
  //   unit: "cm³",
  // },
  {
    question:
      "The diagram shows a square. Two straight lines cut the square into four rectangles. The area of one of the rectangles is shown. Work out the area of the rectangle marked A",
    correct: 42,
    img: "https://i.imgur.com/5SqdfEu.png",
    unit: "cm²",
    categories: ["geometry"],
  },
  {
    question: "Name the following 2D shape.",
    correct: "Pentagon",
    options: ["Pentagon", "Hexagon", "Octagon", "Parallelogram", "Trapezium"],
    img: "https://i.imgur.com/w4b6zrF.png",
    multi: true,
    categories: ["geometry"],
  },
  //   {
  //     question:
  //       "This is a map of the corridors in Newham hostel. You must try to find your way from the lounge to the dining room using a set of instructions. F = forward. R = 90° turn. L = 90° turn",
  //     correct: "correctcorrectcorrect",
  //     options: [
  //       "F 5, R, F 4, L, F 4",
  //       "BBBBBBBBBB",
  //       "CCCCCCCCCC",
  //       "DDDDDDDDDD",
  //       "EEEEEEEEE",
  //     ],
  //     multi: true,
  //   },
  {
    question: "Estimate the weight of an average orange.",
    correct: "200g",
    options: ["1kg", "2kg", "10g", "200g", "800g"],
    multi: true,
    categories: ["measurement"],
  },
  {
    question:
      "On a map a scale of 1cm to 700 metres is used. If a river is 2100 metres long in real life, what length would it be on the map?",
    correct: 3,
    unit: "cm",
    categories: ["ratio and proportion"],
  },
  {
    question:
      "A train leaves London at 9.16 am and arrives in Scotland at 16.03. How long did the journey take?",
    correct: 407,
    unit: "minutes",
    categories: ["measurement", "addition and subtraction"],
  },

  {
    question:
      "The pie chart shows the pets belonging to the children in Sue's class. The total number of pets in the survey is 32.\nWhich of the following is the best estimate for the number of dogs owned by the class?",
    correct: "9",
    options: ["8", "15", "18", "6", "9"],
    multi: true,
    img: "https://i.imgur.com/TpZCE0i.png",
    categories: ["statistics", "ratio and proportion"],
  },
  {
    question:
      "Look at the information on the right for a breakfast cereal. How much carbohydrate would be in a 20 gram serving of cereal?",
    correct: "14",
    unit: "grams",
    img: "https://i.imgur.com/KNRedQM.png",
    categories: ["statistics", "ratio and proportion"],
  },
  {
    question: "If 349 x 84 = 29 316. What is 349 x 42?",
    correct: "14 658",
    options: ["7329", "146 580", "17 264", "58 632", "14 658"],
    multi: true,
    categories: ["numbers", "multiplication and division"],
  },
  {
    question:
      "In the garden, Kylie's father is planting a row of gooseberry bushes. He has already planted the first and last bushes in the row and they are 9 metres apart. If gooseberry bushes have to be planted 1.5 metres apart, how many bushes should he plan between the first and last bushes in order to complete the row?",
    correct: 5,
    categories: ["multiplication and division"],
  },
  {
    question:
      "If each of these bushes will produce between 14kg and 16kg of fruit next summer, what is the average (mean) weight of fruit he can expect to get from all of his bushes in total?",
    correct: 105,
    categories: ["statistics", "multiplication and division"],
  },
  {
    question:
      "A family's journey to their holiday destination involved a car journey to the airport, a wait of 2 hours, a flight, a wait of one hour and a further car journey to the hotel. Their son, David, worked out that his family had spent three times longer in the aeroplane than on the two car journeys added together. The total journey time was 8 hours from start to finish. How long was the family on the aeroplane?",
    correct: 225,
    unit: "minutes",
    categories: ["algebra"],
  },
]

export default problems
