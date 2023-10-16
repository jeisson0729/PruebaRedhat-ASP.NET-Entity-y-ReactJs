using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaRedHat.Models;
using System.Diagnostics.Contracts;

namespace PruebaRedHat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TareaController : ControllerBase
    {
        private readonly DbtareaContext _dbcontext;

        public TareaController(DbtareaContext context)
        {
            _dbcontext = context;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {

            List<Tarea> lista = _dbcontext.Tareas.OrderByDescending(t => t.IdTarea).ThenBy(t => t.FechaRegistro).ToList();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Tarea request)
        {

            await _dbcontext.Tareas.AddAsync(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }



        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] Tarea request)
        {

            _dbcontext.Tareas.Update(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");

        }



        [HttpDelete]
        [Route("Cerrar/{id:int}")]
        public async Task<IActionResult> Cerrar(int id)
        {
            Tarea tarea = _dbcontext.Tareas.Where(t => t.IdTarea == id).FirstOrDefault();

            _dbcontext.Tareas.Remove(tarea);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }



    }
}
