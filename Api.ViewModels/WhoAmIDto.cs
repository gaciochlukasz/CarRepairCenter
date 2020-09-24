using Api.Models.Accounts;

namespace Api.Models.Auth
{
    public enum AuthRedirectType
    {
        AccountWithoutAccess = 0,
        BossAccountWithAccess = 1,
        EmployeeAccountWithAccess = 2
    }

    public class WhoAmIDto : AccountDto
    {
        public AuthRedirectType RedirectType { get; set; }
    }
}