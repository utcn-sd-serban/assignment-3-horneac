package ro.utcn.sd.he.assignment1.persistence.jpa;

import lombok.RequiredArgsConstructor;
import ro.utcn.sd.he.assignment1.model.Question;
import ro.utcn.sd.he.assignment1.persistence.api.QuestionRepository;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class HibernateQuestionRepository implements QuestionRepository {
    private final EntityManager entityManager;

    @Override
    public Question save(Question question) {
        if (question.getId() == 0) {
            entityManager.persist(question);
            return question;
        } else {
            return entityManager.merge(question);
        }
    }

    @Override
    public Optional<Question> findById(int id) {
        return Optional.ofNullable(entityManager.find(Question.class, id));
    }

    @Override
    public void remove(Question question) {

        entityManager.remove(question);
    }

    @Override
    public List<Question> findAll() {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Question> criteriaQuery = criteriaBuilder.createQuery(Question.class);
        criteriaQuery.select(criteriaQuery.from(Question.class));
        return entityManager.createQuery(criteriaQuery).getResultList();
    }
}
