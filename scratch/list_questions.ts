import { chapterData } from '../src/content/chapterData';
import { PRACTICE_QUESTIONS } from '../src/content/practiceData';

console.log('=== QUICKCHECK QUESTIONS (IN-BETWEEN CHAPTER QUESTIONS) ===');
chapterData.scenes.forEach((s) => {
  if (s.quickCheck && s.quickCheck.length > 0) {
    console.log(`\nScene: ${s.id} - ${s.title}`);
    s.quickCheck.forEach((qc, i) => {
      console.log(`  [${s.id}-qc-${i + 1}] "${qc.prompt}" (Ans: ${qc.options[qc.correctIndex]})`);
    });
  }
});

console.log('\n=== PRACTICE QUESTIONS (FIGURE IT OUT, SOLVED EXAMPLES, CONCEPT CLEARING) ===');
const categories = ['ncert-unsolved', 'solved-examples', 'concept-clearing'];
categories.forEach((cat) => {
  console.log(`\n--- CATEGORY: ${cat} ---`);
  const qs = PRACTICE_QUESTIONS.filter((q) => q.category === cat);
  qs.forEach((q, i) => {
    console.log(`  [${q.id}] ${q.title} (Topic: ${q.topic}, Source: ${q.source})`);
    console.log(`      Statement: ${q.statement.replace(/\n/g, ' ')}`);
  });
});
