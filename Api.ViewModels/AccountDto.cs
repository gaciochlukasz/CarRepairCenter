using Api.Common;
using Api.Common.Constraints;
using Api.Models.Auth;
using System.Collections.Generic;

namespace Api.Models.Accounts
{
    public class AccountDto : IIdentifiable
    {
        /// <summary>
        /// Account Id - klucz glowny z tabeli Accounts
        /// </summary>
        public long Id { get; set; }
        public JwtDto AuthorizationToken { get; set; }
        public string MainClaims { get; set; } 
    }
}