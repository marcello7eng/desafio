package br.com.desafio.service;

import br.com.desafio.model.Usuario;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.util.List;
import java.util.UUID;

@ApplicationScoped 
public class UsuarioService {

    // --- Lógica de Leitura (GET) ---
    public List<Usuario> listarTodos() {
     
        return Usuario.listAll();
    }

    public List<Usuario> listarPorPapel(String papel) {
    return Usuario.list("papel", papel);
}


    public Usuario buscarPorId(UUID id) {
        
        Usuario usuario = Usuario.findById(id);
        if (usuario == null) {
            throw new NotFoundException("Usuário não encontrado com o ID: " + id);
        }
        return usuario;
    }


    @Transactional
public Usuario criar(Usuario usuario) {
    try {
        usuario.persist();
        return usuario;
    } catch (Exception e) {
        // Captura erros de banco que ocorrem ao persistir duplicados
        String msg = e.getMessage();
        if (msg != null && msg.contains("Duplicate entry")) {
            throw new RuntimeException("CPF, e-mail ou matrícula já cadastrado!");
        }
        throw e;
    }
}


    @Transactional
    public Usuario atualizar(UUID id, Usuario usuarioAtualizado) {
        Usuario entity = buscarPorId(id); 

        entity.nome = usuarioAtualizado.nome;
        entity.email = usuarioAtualizado.email;
        entity.cpf = usuarioAtualizado.cpf;
        entity.matricula = usuarioAtualizado.matricula;
        entity.papel = usuarioAtualizado.papel;

        entity.persist();
        return entity;
    }

    @Transactional
    public void deletar(UUID id) {
        Usuario entity = buscarPorId(id); 
        entity.delete();
    }
}