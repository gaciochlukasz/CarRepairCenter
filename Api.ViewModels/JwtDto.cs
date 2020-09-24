namespace Api.Models.Auth
{
    public class JwtDto
    {
        public long Id { get; set; }

        public string AuthToken { get; set; }

        public int ExpiresIn { get; set; }
    }

}