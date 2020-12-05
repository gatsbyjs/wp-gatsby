<?php

class ActionMonitorTest extends \Tests\WPGraphQL\TestCase\WPGraphQLTestCase {

	public $admin;
	public $tag;

	public function setUp(): void {
		// Before...
		parent::setUp();

		WPGraphQL::clear_schema();
		// Your set up methods here.

		$this->admin = $this->factory()->user->create( [ 'role' => 'administrator' ] );
		$this->tag   = $this->factory()->tag->create();

		$this->clear_action_monitor();
	}

	public function tearDown(): void {
		$this->delete_posts();

		// Then...
		parent::tearDown();
	}

	public function clear_action_monitor() {
		global $wpdb;
		$sql = wp_strip_all_tags(
			'DELETE posts, pm, pt
			FROM ' . $wpdb->prefix . 'posts AS posts
			LEFT JOIN ' . $wpdb->prefix . 'term_relationships AS pt ON pt.object_id = posts.ID
			LEFT JOIN ' . $wpdb->prefix . 'postmeta AS pm ON pm.post_id = posts.ID
			WHERE posts.post_type = \'%1$s\'', true
		);

		$query = $wpdb->prepare( $sql, 'action_monitor' );
		$wpdb->query( $query );

		add_filter( 'wpgatsby_action_monitor_get_updated_post_ids', function() {
			return [];
		} );

	}

	public function delete_posts() {

		global $wpdb;
		$wpdb->query( $wpdb->prepare(
			"DELETE FROM {$wpdb->prefix}posts WHERE ID <> %d",
			array( 1 )
		) );

	}

	// Tests
	public function test_it_works() {
		$post = static::factory()->post->create_and_get();
		$this->assertInstanceOf( \WP_Post::class, $post );
	}

	public function actionMonitorQuery() {
		return '
    	{
		  actionMonitorActions {
		    nodes {
	          actionType
	          referencedNodeID
	          referencedNodeSingularName
		    }
		  }
		}
    	';
	}

	public function testActionMonitorQueryIsValid() {

		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( [ 'query' => $query ] );
		$this->assertIsValidQueryResponse( $actual );
	}

	public function testCreatePostCreatesActionMonitorAction() {

		// Create a post
		$post_id = $this->factory()->post->create( [
			'post_type'   => 'post',
			'post_status' => 'publish',
			'post_title'  => 'Title',
			'post_author' => $this->admin,
			'tags_input'  => [ $this->tag ]
		] );

		codecept_debug( $this->tag );

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		$this->assertIsValidQueryResponse( $actual );

		// Creating a post assigned to an author should trigger 2 actions:
		// - 1 for the post
		// - 1 for the author
		$this->assertSame( 2, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		// Assert the action monitor has the actions for the post being created
		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'CREATE',
				'referencedNodeID'           => (string) $post_id,
				'referencedNodeSingularName' => 'post',
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $this->admin,
				'referencedNodeSingularName' => 'user'
			] ),
		] );

	}

	public function testCreatePageCreatesActionMonitorAction() {

		// Create a post
		$post_id = $this->factory()->post->create( [
			'post_type'   => 'page',
			'post_status' => 'publish',
			'post_title'  => 'Title',
			'post_author' => $this->admin,
		] );

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		codecept_debug( $actual );

		// Creating a post assigned to an author should trigger 2 actions:
		// - 1 for the post
		// - 1 for the author
		$this->assertSame( 2, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		// Assert the action monitor has the actions for the page being created
		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'CREATE',
				'referencedNodeID'           => (string) $post_id,
				'referencedNodeSingularName' => 'page'
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $this->admin,
				'referencedNodeSingularName' => 'user'
			] ),
		] );

	}

	public function testDeletePostCreatesActionMonitorAction() {

		// Create a post
		$post_id = $this->factory()->post->create( [
			'post_type'   => 'post',
			'post_status' => 'publish',
			'post_title'  => 'Title',
			'post_author' => $this->admin
		] );

		$post_two = $this->factory()->post->create( [
			'post_type'   => 'post',
			'post_status' => 'publish',
			'post_title'  => 'Title',
			'post_author' => $this->admin
		] );

		// Clear the action monitor to remove the mock post creation
		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		wp_delete_post( $post_id, true );

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		/**
		 * There should be 2 action for deleting the page
		 * - 1 for DELETE page
		 * - 1 for UPDATE user (the user still has 1 published post)
		 */
		$this->assertSame( 2, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		codecept_debug( $actual );

		// Assert the action monitor has the actions for the page being created
		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'DELETE',
				'referencedNodeID'           => (string) $post_id,
				'referencedNodeSingularName' => 'post'
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $this->admin,
				'referencedNodeSingularName' => 'user'
			] ),
		] );

		wp_delete_post( $post_two, true );

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		/**
		 * There should be 2 action for deleting the page
		 * - 1 for DELETE page
		 * - 1 for DELETE user (the user has 0 published post, and should now be considered private to Gatsby)
		 */
		$this->assertSame( 2, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		codecept_debug( $actual );

		// Assert the action monitor has the actions for the page being created
		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'DELETE',
				'referencedNodeID'           => (string) $post_id,
				'referencedNodeSingularName' => 'post'
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'DELETE',
				'referencedNodeID'           => (string) $this->admin,
				'referencedNodeSingularName' => 'user'
			] ),
		] );

	}

	public function testTrashPostCreatesActionMonitorAction() {

		// Create a post
		$post_id = $this->factory()->post->create( [
			'post_type'   => 'post',
			'post_status' => 'publish',
			'post_title'  => 'Title',
		] );

		// Clear the action monitor to remove the mock post creation
		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		// Trashing a post should crate an action monitor entry for delete post
		wp_trash_post( $post_id );

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		/**
		 * There should be 1 action for deleting the post
		 */
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		codecept_debug( $actual );

		// Assert the action monitor has the actions for the post being created
		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'DELETE',
				'referencedNodeID'           => (string) $post_id,
				'referencedNodeSingularName' => 'post'
			] ),
		] );

	}

	public function testPublishPostFromDraftCreatesActionMonitorAction() {

		$post_data = [
			'post_status' => 'draft',
			'post_type'   => 'post',
			'post_author' => $this->admin,
			'tags_input'  => [ $this->tag ],
		];

		$post_id = $this->factory()->post->create( $post_data );

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		do_action( 'pre_post_update', $post_id, $post_data );

		// Publish the post
		wp_update_post( [ 'ID' => $post_id, 'post_status' => 'publish' ] );

		// Execute the query
		$actions = $this->graphql( compact( 'query' ) );

		/**
		 * There should be 2 actions
		 * - 1 for the created post
		 * - 1 for the updated author
		 */
		$this->assertSame( 2, count( $actions['data']['actionMonitorActions']['nodes'] ) );

		codecept_debug( $actions );

		// Assert the action monitor has the actions for the page being created
		$this->assertQuerySuccessful( $actions, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'CREATE',
				'referencedNodeID'           => (string) $post_id,
				'referencedNodeSingularName' => 'post'
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $this->admin,
				'referencedNodeSingularName' => 'user'
			] ),
		] );

	}

	public function testChangePostToDraftCreatesActionMonitorAction() {

		$post_id = $this->factory()->post->create([
			'post_type' => 'post',
			'post_status' => 'publish',
			'post_title' => 'test',
			'post_author' => $this->admin,
		]);

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		// Changing a published post to draft (or any non-published status) should
		// trigger a delete action for the post
		wp_update_post([
			'ID' => $post_id,
			'post_status' => 'draft',
		]);

		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );

		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'DELETE',
				'referencedNodeID'           => (string) $post_id,
				'referencedNodeSingularName' => 'post'
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $this->admin,
				'referencedNodeSingularName' => 'user'
			] ),
		] );

	}

	public function testPublishScheduledPostCreatesActionMonitorAction() {

		// same as above test ^
		$test_written = false;
		$this->assertTrue( $test_written );

	}

	public function testUpdatePostMetaOfUnublishedPostDoesNotCreatesActionMonitorAction() {

		// Make sure action is not created when meta is updated on unpublished post
		$test_written = false;
		$this->assertTrue( $test_written );

	}


	public function testDeletePostMetaOfUnublishedPostDoesNotCreatesActionMonitorAction() {

		// Make sure action is not created when meta is deleted on unpublished post
		$test_written = false;
		$this->assertTrue( $test_written );

	}

	public function testUpdatePostMetaOfPublishedPostCreatesActionMonitorAction() {

		$post_id = $this->factory()->post->create( [
			'post_status' => 'publish',
			'post_type'   => 'post',
			'post_author' => $this->admin,
			'tags_input'  => [ $this->tag ],
		] );

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		update_post_meta( $post_id, 'test_meta', 'test_value' );

		/**
		 * There should be 1 actions
		 * - 1 for the updated post
		 */
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		codecept_debug( $actual );

		// Assert the action monitor has the actions for the page being created
		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $post_id,
				'referencedNodeSingularName' => 'post'
			] ),
		] );


	}

	public function testDeletePostMetaCreatesActionMonitorAction() {

		$post_id = $this->factory()->post->create( [
			'post_status' => 'draft',
			'post_type'   => 'post',
			'post_author' => $this->admin,
			'tags_input'  => [ $this->tag ],
		] );

		update_post_meta( $post_id, 'test_meta', 'test_value' );

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		delete_post_meta( $post_id, 'test_meta' );

		/**
		 * There should be 1 actions
		 * - 1 for the updated post
		 */
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		codecept_debug( $actual );

		// Assert the action monitor has the actions for the page being created
		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $post_id,
				'referencedNodeSingularName' => 'post'
			] ),
		] );

	}

	// @todo
	public function testNewPostTypesDetectedWithGraphqlSupportCreateActionMonitorAction() {
		// we should store the post types that are registered
		// and on init we should diff it and see if the
		// new post types have been registered and
		// create an action for that
	}

	// @todo
	public function testPostTypeRemovedFromGraphQLCreateActionMonitorAction() {
		// we should store the post types that are registered
		// and on init we should diff it and see if the
		// new post types have been registered and
		// create an action for that
	}

	// @todo
	public function testPostTypeWithGraphQLSupportIsUpdatedCreateActionMonitorAction() {
		// when a post type registry is changed in some critical way
		// create an update action
	}


	// @todo: review the ones below this with Tyler
	public function testCreatePostOfACustomPostTypeCreatesActionMonitorAction() {

		// register a post type
		register_post_type( 'wp_gatsby_test', [
			'public'              => true,
			'show_in_graphql'     => true,
			'graphql_single_name' => 'wpGatsbyTest',
			'graphql_plural_name' => 'wpGatsbyTests',
		] );

		// Create a post
		$post_id = $this->factory()->post->create( [
			'post_type'   => 'wp_gatsby_test',
			'post_status' => 'publish',
			'post_title'  => 'Title',
			'post_author' => $this->admin,
			'tags_input'  => [ $this->tag ]
		] );

		codecept_debug( $this->tag );

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		$this->assertIsValidQueryResponse( $actual );

		// Creating a post assigned to an author should trigger 3 actions:
		// - 1 for the post
		// - 1 for the author
		$this->assertSame( 2, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		// Assert the action monitor has the actions for the post being created
		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'CREATE',
				'referencedNodeID'           => (string) $post_id,
				'referencedNodeSingularName' => 'wpGatsbyTest',
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $this->admin,
				'referencedNodeSingularName' => 'user',
			] ),
		] );

	}

	public function testCreatePostOfCustomPostTypeNotInGraphQLDoesNotCreateActionMonitorAction() {

		// register a post type to NOT show in GraphQL
		register_post_type( 'wp_gatsby_no', [
			'public'          => true,
			'show_in_graphql' => false,
		] );

		// Create a post
		$this->factory()->post->create( [
			'post_type'   => 'wp_gatsby_no',
			'post_status' => 'publish',
			'post_title'  => 'Title',
			'post_author' => $this->admin,
			'tags_input'  => [ $this->tag ]
		] );

		codecept_debug( $this->tag );

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		$this->assertIsValidQueryResponse( $actual );

		// Creating a post for a custom post type not shown in GraphQL should trigger 0 actions:
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

	}

	public function testCreateCategoryCreatesActionMonitorAction() {

		// Create a post
		$category_id = $this->factory()->category->create();

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		$this->assertIsValidQueryResponse( $actual );

		// Creating a category trigger 1 actions:
		// - 1 for the category being created
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		// Assert the action monitor has the actions for the post being created
		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'CREATE',
				'referencedNodeID'           => (string) $category_id,
				'referencedNodeSingularName' => 'category'
			] ),
		] );

	}

	public function testUpdateCategoryCreatesActionMonitorAction() {

		// Create a post
		$category_id = $this->factory()->category->create();

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		wp_update_term( $category_id, 'category', [
			'description' => 'updated...'
		] );

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		$this->assertIsValidQueryResponse( $actual );

		// Updating a category should trigger 1 action
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		// Assert the action monitor has the actions for the post being created
		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $category_id,
				'referencedNodeSingularName' => 'category'
			] ),
		] );

	}

	public function testDeleteCategoryCreatesActionMonitorAction() {

		// Create a post
		$category_id = $this->factory()->category->create();

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		wp_delete_term( $category_id, 'category' );

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		$this->assertIsValidQueryResponse( $actual );

		// Creating a post assigned to an author should trigger 1 actions:
		// - 1 for the category being updated
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		// Assert the action monitor has the actions for the post being created
		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'DELETE',
				'referencedNodeID'           => (string) $category_id,
				'referencedNodeSingularName' => 'category'
			] ),
		] );

	}

	public function testUpdateCategoryMetaCreatesActionMonitorAction() {

		// Create a post
		$category_id = $this->factory()->category->create();

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		update_term_meta( $category_id, 'test_key', 'test_value' );

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		$this->assertIsValidQueryResponse( $actual );

		// Creating a post assigned to an author should trigger 1 actions:
		// - 1 for the category being updated
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		// Assert the action monitor has the actions for the post being created
		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $category_id,
				'referencedNodeSingularName' => 'category'
			] ),
		] );

	}

	public function testDeleteCategoryMetaCreatesActionMonitorAction() {

		// Create a post
		$category_id = $this->factory()->category->create();

		update_term_meta( $category_id, 'test_key', 'test_value' );

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		delete_term_meta( $category_id, 'test_key' );

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		$this->assertIsValidQueryResponse( $actual );

		// Creating a post assigned to an author should trigger 1 actions:
		// - 1 for the category being updated
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		// Assert the action monitor has the actions for the post being created
		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $category_id,
				'referencedNodeSingularName' => 'category'
			] ),
		] );

	}

	public function testCreateUserDoesNotCreateActionMonitorAction() {

		$this->factory()->user->create();

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		$this->assertIsValidQueryResponse( $actual );

		// Creating a user shouldn't trigger an action because a user isn't public until
		// it has published posts
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

	}

	public function testDeleteUserWithoutPublishedPostsDoesNotCreateActionMonitorAction() {

		$user_id = $this->factory()->user->create();

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		wp_delete_user( $user_id );

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		$this->assertIsValidQueryResponse( $actual );

		// Deleting a user with no published content should not trigger an action
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

	}

	public function testDeleteUserWithPublishedPostsCreatesActionMonitorAction() {

		$user_id = $this->factory()->user->create();
		$this->factory()->post->create( [
			'post_type'   => 'post',
			'post_status' => 'publish',
			'post_author' => $user_id,
			'post_title'  => 'test'
		] );

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		wp_delete_user( $user_id );

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		$this->assertIsValidQueryResponse( $actual );

		/**
		 * Deleting a user with no published content should trigger 1 actions
		 * - 1 for the user being deleted
		 */
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		// Assert the action monitor has the actions for the user being deleted
		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'DELETE',
				'referencedNodeID'           => (string) $user_id,
				'referencedNodeSingularName' => 'user'
			] ),
			// @todo: BULK_UPDATE ACTION FOR POSTS THAT THE USER WAS THE AUTHOR OF
		] );

	}

	public function testUpdateUserWithPublishedPostsCreatesActionMonitorAction() {

		$user_id = $this->factory()->user->create();
		$this->factory()->post->create( [
			'post_type'   => 'post',
			'post_status' => 'publish',
			'post_author' => $user_id,
			'post_title'  => 'test'
		] );

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		wp_update_user( [
			'ID'           => $user_id,
			'display_name' => 'updated_display_name'
		] );

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		$this->assertIsValidQueryResponse( $actual );

		/**
		 * Deleting a user with no published content should trigger 1 actions
		 * - 1 for the user being updated
		 */
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		// Assert the action monitor has the actions for the user being updated
		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $user_id,
				'referencedNodeSingularName' => 'user'
			] ),
		] );

	}

	public function testUpdateUserMetaForPublishedAuthorCreatesActionMonitorAction() {

		$user_id = $this->factory()->user->create();
		$this->factory()->post->create( [
			'post_type'   => 'post',
			'post_status' => 'publish',
			'post_author' => $user_id,
			'post_title'  => 'test'
		] );

		update_user_meta( $user_id, 'test_key', 'test_value' );

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		update_user_meta( $user_id, 'test_key', 'test_value' );

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		$this->assertIsValidQueryResponse( $actual );

		/**
		 * Deleting a user with no published content should trigger 1 actions
		 * - 1 for the user being updated
		 */
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		// Assert the action monitor has the actions for the user being deleted
		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $user_id,
				'referencedNodeSingularName' => 'user'
			] ),
		] );

	}

	public function testDeleteUserMetaForPublishedAuthorCreatesActionMonitorAction() {

		$user_id = $this->factory()->user->create();
		$this->factory()->post->create( [
			'post_type'   => 'post',
			'post_status' => 'publish',
			'post_author' => $user_id,
			'post_title'  => 'test'
		] );

		update_user_meta( $user_id, 'test_key', 'test_value' );

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		delete_user_meta( $user_id, 'test_key' );

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		$this->assertIsValidQueryResponse( $actual );

		/**
		 * Deleting a user with no published content should trigger 1 actions
		 * - 1 for the user being updated
		 */
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		// Assert the action monitor has the actions for the user being deleted
		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $user_id,
				'referencedNodeSingularName' => 'user'
			] ),
		] );

	}

	public function testCreateHierarchicalTermWithParentCreatesActionMonitorAction() {

		// @todo
		// If a hierarchical term is created with a parent term,
		// We need a CREATE action for the term and an UPDATE action for the parent

	}

	public function testUpdateHierarchicalTermWithParentAndChildCreatesActionMonitorAction() {

		// @todo
		// If a hierarchical term is update with a parent term and child
		// We need a UPDATE action for the term

	}

	public function testDeleteHierarchicalTermThatHasParentAndChildrenCreatesActionMonitorAction() {

		// @todo
		// If a hierarchical term is update with a parent term and child
		// We need a DELETE action for the term being deleted, UPDATE action for the parent, UPDATE action for each child

	}
}
