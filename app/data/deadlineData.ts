
export type Deadline = {
  id: number;
  title: string;
  course: string;
  description: string;
  dueDate: string;
  completed: boolean;
};


export const deadlinesData:Deadline[] = [
  {
    id: 1,
    title: "Math Assignment 3",
    course: "Mathematics",
    dueDate: "2025-08-15",
    description: "Solve problems from Chapter 6 and 7.",
    completed:false
  },
  {
    id: 2,
    title: "Physics Lab Report",
    course: "Physics",
    dueDate: "2025-08-17",
    description: "Submit report on the recent pendulum experiment.",
    completed:false
  },
  {
    id: 3,
    title: "English Essay Submission",
    course: "English",
    dueDate: "2025-08-20",
    description: "Essay on Shakespeare's influence on modern literature.",
    completed:false
  },

  {
    id: 4,
    title: "Computer Science Project Proposal",
    course: "CS 301",
    description: "Submit initial project idea with team details",
    dueDate: "2025-08-18",
    completed: true,
  },
  {
    id: 5,
    title: "History Presentation Slides",
    course: "World History",
    description: "Prepare slides on World War II events",
    dueDate: "2025-08-09",
    completed: false,
  },
  {
    id: 6,
    title: "Biology Quiz Prep",
    course: "Biology 104",
    description: "Revise chapters 5-8 for the upcoming quiz",
    dueDate: "2025-08-11",
    completed: true,
  },
];
