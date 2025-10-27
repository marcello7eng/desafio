package br.com.desafio.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "cursos")
public class Curso extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public UUID id;

    @Column(length = 100, nullable = false)
    public String nome;

    @Column(length = 50)
    public String area; 

    @Column(length = 2, name = "duracao_semestres")
    public Integer duracaoSemestres;

    @Column(length = 50)
    public String codigo;

    @Column(length = 255)
    public String descricao;

    // Um Curso tem Muitas Disciplinas
    @OneToMany(
        mappedBy = "curso", 
        cascade = CascadeType.ALL, 
        orphanRemoval = true, 
        fetch = FetchType.EAGER 
    )
    public List<Disciplina> disciplinas = new ArrayList<>();
  

    public Curso() {}
}