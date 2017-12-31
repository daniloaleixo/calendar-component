var assert = require('assert');
var pixelmatch = require('pixelmatch');
var PNG = require('pngjs').PNG;
var fs = require('fs');
var path = require('path');
var sys = require('util');
// TODO 
// O exec nao espera o serve terminar provavelmente e tenta executar a tela sem 
// o servidor local estar rodando

// var exec = require('child_process').exec;
// exec('ng serve --port 8090');
var url = 'http://localhost:4200';

describe('Tryout#1 - ', function() {

	it('Teste de fumaça: pelo menos este teste tem que rodar', function() {
		assert(true, true)
	});

	describe('Código HTML&CSS: ', function() {

		it('O layout desktop deve ser igual ao gabarito', function () {
			layoutTestRunner("assertion-desktop", 800, 600)
	    });

	    it('O layout mobile deve ser igual ao gabarito', function () {
	        layoutTestRunner("assertion-mobile", 376, 667)
	    });

	});

	describe('Input de eventos: ', function() {
		it ('Deve conseguir ver evento já existente', function() {
			browser.url(url);
			browser.waitUntil(function(){
				return browser.isVisible('#appointment-input') && browser.isVisible('#appointment-submit') && browser.isVisible('.calendar__day.has-event');
			}, 5000, 'tempo excessivo para carregamento de dados assincronos');
			assert.equal("Never Forget", browser.element('.appointments__list li').getText());
		});
		
		it ('Deve conseguir adicionar evento', function() {
			browser.url(url);
			browser.waitUntil(function(){
				return browser.isVisible('#appointment-input') && browser.isVisible('#appointment-submit') && browser.isVisible('.calendar__day.has-event');
			}, 5000, 'tempo excessivo para carregamento de dados assincronos');
			browser.element('#appointment-input').setValue("Zimp Zopper");
			browser.click('#appointment-submit');
			browser.waitUntil(function() {
				return browser.getText('.appointments__list li:last-child') === 'Zimp Zopper';
			}, 5000, 'tempo excessivo para carregamento de dados assincronos');
			assert.equal("Zimp Zopper", browser.element('.appointments__list li:last-child').getText());
		});
	});
});

function layoutTestRunner(assertion_file, width, height) {
	browser.setViewportSize({
	    width: width,
	    height: height
	});
	browser.url(url);
	browser.waitUntil(function(){
		return browser.isVisible('#appointment-input') && browser.isVisible('#appointment-submit') && browser.isVisible('.calendar__day.has-event');
	}, 5000, 'tempo excessivo para carregamento de dados assincronos');
	var screenshotName = './screenshot-' + assertion_file + ".png"
	browser.saveScreenshot(screenshotName);
	var os = process.platform;
	var img1 = PNG.sync.read(fs.readFileSync(screenshotName));
	var img2 = PNG.sync.read(fs.readFileSync('./test/' + os + "-" + assertion_file + '.png'));
    var diff = new PNG({width: img1.width, height: img1.height});
    var pixelsDiff = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.1});
    diff.pack().pipe(fs.createWriteStream('diff' + assertion_file + '.png'));
	assert.equal(pixelsDiff, 0);
}
