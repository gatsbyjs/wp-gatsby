<?php

class ActivePluginTest extends \Codeception\TestCase\WPTestCase {

	public function setUp(): void {
		parent::setUp();
	}

	public function tearDown(): void {
		parent::tearDown();
	}

	public function testActivePlugin() {
		$this->assertTrue( true );
	}

	public function testSomethingElse() {
		$this->assertTrue( true );
	}

}
