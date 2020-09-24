using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Api.ViewModels
{
    public class CreateUserDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 8, ErrorMessage = "You must specify password between 8 and 30 length")]
        public string Password { get; set; }
    }
}
