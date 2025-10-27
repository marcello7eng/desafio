package br.com.desafio.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "usuarios")
public class Usuario extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID) // Geração automática de UUID
    public UUID id;

    @Column(length = 100, nullable = false)
    public String nome;

    @Column(unique = true, nullable = false)
    public String email;

    @Column(unique = true, length = 11)
    public String cpf;

    @Column(unique = true, length = 20)
    public String matricula;

    @Column(length = 20)
    public String papel; // "admin", "professor", "aluno", "coordenador"

    public Usuario() {}


}
