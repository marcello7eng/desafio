package br.com.desafio.resource;

import br.com.desafio.model.Usuario;
import br.com.desafio.service.UsuarioService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.UUID;

@Path("/api/usuarios")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UsuarioResource {

    @Inject
    UsuarioService service;

   //Apenas o admin pode ver ou manipular usuários
    @GET
    @RolesAllowed("admin")
    public Response listarTodos(@QueryParam("papel") String papel) {
        if (papel != null && !papel.isEmpty()) {
            return Response.ok(service.listarPorPapel(papel)).build();
        }
        return Response.ok(service.listarTodos()).build();
    }

    @GET
    @Path("/{id}")
    @RolesAllowed("admin")
    public Response buscarPorId(@PathParam("id") UUID id) {
        return Response.ok(service.buscarPorId(id)).build();
    }

    @POST
    @RolesAllowed("admin")
    public Response criar(Usuario usuario) {
        Usuario novoUsuario = service.criar(usuario);
        return Response.status(Response.Status.CREATED).entity(novoUsuario).build();
    }

    @PUT
    @Path("/{id}")
    @RolesAllowed("admin")
    public Response atualizar(@PathParam("id") UUID id, Usuario usuario) {
        return Response.ok(service.atualizar(id, usuario)).build();
    }

    @DELETE
    @Path("/{id}")
    @RolesAllowed("admin")
    public Response deletar(@PathParam("id") UUID id) {
        service.deletar(id);
        return Response.noContent().build();
    }
}