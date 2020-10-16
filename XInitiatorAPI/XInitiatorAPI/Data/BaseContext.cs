using Microsoft.EntityFrameworkCore;
using XInitiatorAPI.Data.Models;

namespace XInitiatorAPI.Data
{
    public class BaseContext: DbContext
    {
        public BaseContext(DbContextOptions<BaseContext> options): base(options)
        {

        }

        public BaseContext()
        {

        }

        public virtual DbSet<InitiativeYear> InitiativeYears { get; set; }
        public virtual DbSet<Initiative> Initiatives { get; set; }
        public virtual DbSet<InitiativeByYear> InitiativesByYears { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Meeting> Meetings { get; set; }
        public virtual DbSet<Note> Notes { get; set; }
        public virtual DbSet<Action> Actions { get; set; }
        public virtual DbSet<ActionAssignment> ActionAssignments { get; set; }
        public virtual DbSet<Membership> Memberships { get; set; }
        public virtual DbSet<ReviewCycle> ReviewCycles { get; set; }
        public virtual DbSet<Review> Reviews { get; set; }
        public virtual DbSet<MeetingParticipant> MeetingParticipants { get; set; }

    }
}
