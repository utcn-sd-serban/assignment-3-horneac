package ro.utcn.sd.he.assignment1.Seed;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import ro.utcn.sd.he.assignment1.model.Question;
import ro.utcn.sd.he.assignment1.service.QuestionService;

import javax.transaction.Transactional;
import java.sql.Timestamp;

@Component
@RequiredArgsConstructor
@Order(Ordered.HIGHEST_PRECEDENCE)
public class QuestionSeed implements CommandLineRunner {
    private final QuestionService questionService;

    @Override
    @Transactional
    public void run(String... args) {
        if (questionService.listQuestions().isEmpty()) {
            questionService.saveQuestion(new Question(0, "Emanuel", "title1", "Cum se face tema la SD", new Timestamp(System.currentTimeMillis())));
            questionService.saveQuestion(new Question(0, "Alexandra", "title2", "Cum se face tema la SCS", new Timestamp(System.currentTimeMillis())));
            questionService.saveQuestion(new Question(0, "Paul", "title3", "Cum se face tema la IS", new Timestamp(System.currentTimeMillis())));
            questionService.saveQuestion(new Question(0, "Zbona", "title4", "Cum se face tema la ....", new Timestamp(System.currentTimeMillis())));
        }
    }
}
