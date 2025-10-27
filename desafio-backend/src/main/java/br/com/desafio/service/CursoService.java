package br.com.desafio.service;

import br.com.desafio.model.Curso;
import br.com.desafio.model.Disciplina;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.WebApplicationException;

import java.util.List;
import java.util.UUID;

@ApplicationScoped // Define esta classe como um bean de serviço (como o @Service do Spring)
public class CursoService {

   
    public List<Curso> listarTodos() {
        return Curso.listAll();
    }

    public Curso buscarPorId(UUID id) {
        Curso curso = Curso.findById(id);
        if (curso == null) {
            throw new NotFoundException("Curso não encontrado com o ID: " + id);
        }
        return curso;
    }

    // --- Lógica de Escrita (POST, PUT, DELETE) ---

    @Transactional 
    public Curso criar(Curso curso) {
       
        curso.persist();
        return curso;
    }

    @Transactional
    public Curso atualizar(UUID id, Curso cursoAtualizado) {
        Curso entity = buscarPorId(id);

        entity.nome = cursoAtualizado.nome;
        entity.codigo = cursoAtualizado.codigo;
        entity.descricao = cursoAtualizado.descricao;

        entity.persist(); 
        return entity;
    }

    @Transactional
    public void deletar(UUID id) {
        Curso entity = buscarPorId(id);
        
        entity.delete();
    }

    

@Transactional
public Disciplina adicionarDisciplina(UUID cursoId, Disciplina disciplina) {
    // 1. Encontra o curso
    Curso curso = buscarPorId(cursoId); // Reusa o método que já lança 404

    // 2. "Linka" a disciplina ao curso
    disciplina.curso = curso;
    disciplina.semestre = disciplina.semestre; // Pega o semestre do JSON

    // 3. Salva a disciplina (o Panache/Hibernate cuida da chave estrangeira)
    disciplina.persist();

    return disciplina;
}

@Transactional
public void deletarDisciplina(UUID cursoId, UUID disciplinaId) {
  
    Curso curso = buscarPorId(cursoId);

   
    Disciplina disciplina = Disciplina.findById(disciplinaId);

    if (disciplina == null) {
        throw new NotFoundException("Disciplina não encontrada");
    }

   
    if (!disciplina.curso.id.equals(curso.id)) {
        // Lança um 400 Bad Request (ou 403 Forbidden)
        throw new WebApplicationException("Disciplina não pertence ao curso informado", 400);
    }

   
    disciplina.delete();
}
    @Transactional
public Disciplina atualizarDisciplina(UUID cursoId, UUID disciplinaId, Disciplina disciplinaAtualizada) {
    
    Curso curso = buscarPorId(cursoId);

    Disciplina entity = Disciplina.findById(disciplinaId);

    if (entity == null) {
        throw new NotFoundException("Disciplina não encontrada");
    }

   
    if (!entity.curso.id.equals(curso.id)) {
        throw new WebApplicationException("Disciplina não pertence ao curso informado", 400);
    }


    entity.nome = disciplinaAtualizada.nome;
    entity.codigo = disciplinaAtualizada.codigo;
    entity.cargaHoraria = disciplinaAtualizada.cargaHoraria;
    entity.semestre = disciplinaAtualizada.semestre;

    entity.persist();
    return entity;
}
}