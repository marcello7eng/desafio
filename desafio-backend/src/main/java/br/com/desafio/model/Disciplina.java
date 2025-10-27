package br.com.desafio.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "disciplinas")
public class Disciplina extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public UUID id;

    @Column(length = 100, nullable = false)
    public String nome;

    @Column(length = 50, unique = true)
    public String codigo; 

    public Integer cargaHoraria;

    
    @Column(length = 2)
    public int semestre; 
    
    // Muitas Disciplinas pertencem a Um Curso
    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "curso_id") 
    @JsonIgnore 
    public Curso curso;
   

   
    public Disciplina() {
    }
}