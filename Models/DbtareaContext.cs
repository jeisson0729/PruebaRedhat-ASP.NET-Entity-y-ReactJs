using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace PruebaRedHat.Models;

public partial class DbtareaContext : DbContext
{
    public DbtareaContext()
    {
    }

    public DbtareaContext(DbContextOptions<DbtareaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Tarea> Tareas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-R79A4MJ; Encrypt=False; DataBase=DBTAREA;Trusted_Connection=True;Integrated Security=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tarea>(entity =>
        {
            entity.HasKey(e => e.IdTarea).HasName("PK__Tarea__EADE9098CBD1B1AE");

            entity.ToTable("Tarea");

            entity.Property(e => e.Descripcion)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Estado)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FechaRegistro)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
