package br.com.desafio.resource;

import br.com.desafio.model.Curso;
import br.com.desafio.model.Disciplina;
import br.com.desafio.service.CursoService;
import jakarta.annotation.security.RolesAllowed; 
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.UUID;

@Path("/api/cursos")
@Produces(MediaType.APPLICATION_JSON) // Saída em JSON
@Consumes(MediaType.APPLICATION_JSON) // Entrada em JSON
public class CursoResource {


    @Inject
    CursoService service;

  
    @GET
    @RolesAllowed({"admin", "coordenador", "professor", "aluno"})
    public Response listarTodos() {
        return Response.ok(service.listarTodos()).build();
    }


    @GET
    @Path("/{id}")
    @RolesAllowed({"admin", "coordenador", "professor", "aluno"})
    public Response buscarPorId(@PathParam("id") UUID id) {
        return Response.ok(service.buscarPorId(id)).build();
    }

    @POST
    @RolesAllowed({"admin", "coordenador"})
    public Response criar(Curso curso) {
        Curso novoCurso = service.criar(curso);
        return Response.status(Response.Status.CREATED).entity(novoCurso).build();
    }

    @PUT
    @Path("/{id}")
    @RolesAllowed({"admin", "coordenador"})
    public Response atualizar(@PathParam("id") UUID id, Curso curso) {
        return Response.ok(service.atualizar(id, curso)).build();
    }

    @DELETE
    @Path("/{id}")
    @RolesAllowed({"admin", "coordenador"})
    public Response deletar(@PathParam("id") UUID id) {
        service.deletar(id);
        return Response.noContent().build(); // Retorna 204
    }

    @POST
@Path("/{cursoId}/disciplinas") 
@RolesAllowed({"admin", "coordenador"})
public Response adicionarDisciplina(
        @PathParam("cursoId") UUID cursoId, 
        Disciplina disciplina) { // Pega a disciplina do JSON

    Disciplina novaDisciplina = service.adicionarDisciplina(cursoId, disciplina);
    return Response.status(Response.Status.CREATED).entity(novaDisciplina).build();
}

@DELETE
@Path("/{cursoId}/disciplinas/{disciplinaId}")
@RolesAllowed({"admin", "coordenador"})
public Response deletarDisciplina(
        @PathParam("cursoId") UUID cursoId, 
        @PathParam("disciplinaId") UUID disciplinaId) {

    service.deletarDisciplina(cursoId, disciplinaId);
    return Response.noContent().build();
}

@PUT
@Path("/{cursoId}/disciplinas/{disciplinaId}")
@RolesAllowed({"admin", "coordenador"})
public Response atualizarDisciplina(
        @PathParam("cursoId") UUID cursoId, 
        @PathParam("disciplinaId") UUID disciplinaId,
        Disciplina disciplina) { // Pega o JSON com as atualizações

    Disciplina disciplinaAtualizada = service.atualizarDisciplina(cursoId, disciplinaId, disciplina);
    return Response.ok(disciplinaAtualizada).build();
}
}