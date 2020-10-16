using Castle.Core.Logging;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XInitiatorAPI.Controllers;
using XInitiatorAPI.Data.Dtos;
using XInitiatorAPI.Data.Models;
using XInitiatorAPI.Services.Initiatives;
using Xunit;

namespace XInitiatorAPI.Test.InitiativeTest
{
    public class InitiativesControllerTests: InitiativesTestData
    {
        private InitiativesController _initiativesController;
        private readonly Mock<IInitiativeService> _mockInitiativeService;
        private readonly Mock<ILogger<InitiativesController>> _logger;
        private Initiative _mockInitiative;
        private List<Initiative> _mockInitiativeList;

        public InitiativesControllerTests()
        {
            _logger = new Mock<ILogger<InitiativesController>>();
            _mockInitiativeService = new Mock<IInitiativeService>();
            _mockInitiative = getTestInitiative();
            _mockInitiativeList = getTestInitiativeList();
            _initiativesController = new InitiativesController(_mockInitiativeService.Object, _logger.Object);
        }

        [Fact]
        public void CreateInitiative_ReturnsCreatedInitiative_Pass()
        {

            _mockInitiativeService.Setup(x => x.CreateNewInitiative(It.IsAny<InitiativeDto>())).ReturnsAsync(_mockInitiative);

            InitiativeDto initiative = new InitiativeDto
            {
                Name = _mockInitiative.Name,
                Description = _mockInitiative.Description
            };

            var foundResult = _initiativesController.Create(initiative);
            var result = Assert.IsType<Task<IActionResult>>(foundResult);
            var actionResult = Assert.IsType<OkObjectResult>(result.Result);
            var model = Assert.IsType<Initiative>(actionResult.Value);

        }

        [Fact]
        public void CreateInitiative_WithNullObject_ReturnsBadRequest_Fail()
        {
            _mockInitiativeService.Setup(x => x.CreateNewInitiative(It.IsAny<InitiativeDto>())).ReturnsAsync(_mockInitiative);

            InitiativeDto initiative = null;
            var foundResult = _initiativesController.Create(initiative);
            var result = Assert.IsType<Task<IActionResult>>(foundResult);
            var actionResult = Assert.IsType<BadRequestObjectResult>(result.Result);

        }

        [Fact]
        public void CreateInitiative_EmptyFields_ReturnsBadRequest_Fail()
        {
            _mockInitiativeService.Setup(x => x.CreateNewInitiative(It.IsAny<InitiativeDto>())).ReturnsAsync(_mockInitiative);

            InitiativeDto initiative = new InitiativeDto
            {
                Name = "",
                Description = ""
            };
            var foundResult = _initiativesController.Create(initiative);
            var result = Assert.IsType<Task<IActionResult>>(foundResult);
            var actionResult = Assert.IsType<BadRequestObjectResult>(result.Result);

        }
        [Fact]
        public void GetAll_ReturnsInitiativeList_Pass()
        {
            _mockInitiativeService.Setup(x => x.GetAllIntiatives()).ReturnsAsync(_mockInitiativeList);
            var foundResult = _initiativesController.GetAll();
            var result = Assert.IsType<Task<IActionResult>>(foundResult);
            var actionResult = Assert.IsType<OkObjectResult>(result.Result);
            var model = Assert.IsType<List<Initiative>>(actionResult.Value);

        }

        [Theory]
        [InlineData("79b5d27a-4da0-4922-a2cf-ffaba4046045")]
        public void GetById_ReturnsInitiative_Pass(string initiativeId)
        {
            _mockInitiativeService.Setup(x => x.GetInitiativeById(It.IsAny<Guid>())).ReturnsAsync(_mockInitiative);
            var foundResult = _initiativesController.GetById(initiativeId);
            var result = Assert.IsType<Task<IActionResult>>(foundResult);
            var actionResult = Assert.IsType<OkObjectResult>(result.Result);
            var model = Assert.IsType<Initiative>(actionResult.Value);

        }

        [Theory]
        [InlineData("")]
        public void GetById_WithEmptyId_ReturnsBadRequest_Fail(string initiativeId)
        {
            _mockInitiativeService.Setup(x => x.GetInitiativeById(It.IsAny<Guid>())).ReturnsAsync(_mockInitiative);
            var foundResult = _initiativesController.GetById(initiativeId);
            var result = Assert.IsType<Task<IActionResult>>(foundResult);
            var actionResult = Assert.IsType<BadRequestObjectResult>(result.Result);

        }

        [Theory]
        [InlineData("5668d2d8-d823-4418-b21e-14486982595e")]
        public void Edit_ReturnsEditedInitiative_Pass(string initiativeId)
        {

            InitiativeDto initiative = new InitiativeDto
            {
                Name = _mockInitiative.Name,
                Description = _mockInitiative.Description
            };

            _mockInitiativeService.Setup(x => x.EditInitiative(It.IsAny<Guid>(), It.IsAny<InitiativeDto>())).ReturnsAsync(_mockInitiative);
            var foundResult = _initiativesController.Edit(initiativeId, initiative);
            var result = Assert.IsType<Task<IActionResult>>(foundResult);
            var actionResult = Assert.IsType<OkObjectResult>(result.Result);
            var model = Assert.IsType<Initiative>(actionResult.Value);

        }

        [Theory]
        [InlineData("")]
        public void Edit_WithEmptyId_ReturnsBadRequest_Fail(string initiativeId)
        {

            InitiativeDto initiative = new InitiativeDto
            {
                Name = _mockInitiative.Name,
                Description = _mockInitiative.Description
            };

            _mockInitiativeService.Setup(x => x.EditInitiative(It.IsAny<Guid>(), It.IsAny<InitiativeDto>())).ReturnsAsync(_mockInitiative);
            var foundResult = _initiativesController.Edit(initiativeId, initiative);
            var result = Assert.IsType<Task<IActionResult>>(foundResult);
            var actionResult = Assert.IsType<BadRequestObjectResult>(result.Result);

        }

        [Theory]
        [InlineData("5668d2d8-d823-4418-b21e-14486982595e")]
        public void Edit_WithEmptyObject_ReturnsBadRequest_Fail(string initiativeId)
        {

            InitiativeDto initiative = null;

            _mockInitiativeService.Setup(x => x.EditInitiative(It.IsAny<Guid>(), It.IsAny<InitiativeDto>())).ReturnsAsync(_mockInitiative);
            var foundResult = _initiativesController.Edit(initiativeId, initiative);
            var result = Assert.IsType<Task<IActionResult>>(foundResult);
            var actionResult = Assert.IsType<BadRequestObjectResult>(result.Result);

        }

        [Theory]
        [InlineData("5668d2d8-d823-4418-b21e-14486982595e")]
        public void Delete_ReturnsTrue_Pass(string initiativeId)
        {

            _mockInitiativeService.Setup(x => x.DeleteInitiative(It.IsAny<Guid>())).ReturnsAsync(true);
            var foundResult = _initiativesController.Delete(initiativeId);
            var result = Assert.IsType<Task<IActionResult>>(foundResult);
            var actionResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.True((bool)actionResult.Value);

        }

        [Theory]
        [InlineData("")]
        public void Delete_WithoutInitiativeId_ReturnsRequestError_Fail(string initiativeId)
        {

            _mockInitiativeService.Setup(x => x.DeleteInitiative(It.IsAny<Guid>())).ReturnsAsync(true);
            var foundResult = _initiativesController.Delete(initiativeId);
            var result = Assert.IsType<Task<IActionResult>>(foundResult);
            var actionResult = Assert.IsType<BadRequestObjectResult>(result.Result);

        }
    }
}
