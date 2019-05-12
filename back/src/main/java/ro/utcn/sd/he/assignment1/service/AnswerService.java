package ro.utcn.sd.he.assignment1.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.utcn.sd.he.assignment1.model.Answer;
import ro.utcn.sd.he.assignment1.model.Question;
import ro.utcn.sd.he.assignment1.model.User;
import ro.utcn.sd.he.assignment1.persistence.api.RepositoryFactory;

import javax.transaction.Transactional;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final RepositoryFactory factory;

    @Transactional
    public List<Answer> findAllAnswers() {
        return factory.createAnswerRepository().findAll();
    }

    @Transactional
    public Answer saveAnswer(Answer answer) {
        return factory.createAnswerRepository().save(answer);
    }

    @Transactional
    public boolean editAnswer(int answerId, String newText, User currentUser) {
        Optional<Answer> answer = factory.createAnswerRepository().findById(answerId);
        User user = factory.createUserRepository().getAuthorOf(answer.get());
        if (currentUser != user) {
            return false;
        }
        answer.get().setText(newText);
        factory.createAnswerRepository().save(answer.get());
        return true;

    }

    @Transactional
    public List<Answer> findAnswersOf(Question question) {
        List<Answer> answers = factory.createAnswerRepository().getAnswersOf(question);
        answers.sort(new CustomComparator().reversed());
        return answers;
    }

    @Transactional
    public Answer findById(int id) {
        return factory.createAnswerRepository().findById(id).get();
    }

    @Transactional
    public void deleteAnswer(int id) {
        Optional<Answer> answer = factory.createAnswerRepository().findById(id);
        factory.createAnswerRepository().remove(answer.get());
    }

    protected class CustomComparator implements Comparator<Answer> {
        public int compare(Answer a1, Answer a2) {
            return factory.createVoteRepository().getVoteCount(a1) - factory.createVoteRepository().getVoteCount(a2);
        }
    }

}
