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

		// create a 2nd post for the user. if the user still has published posts
		// this should trigger an update action for the user
		$this->factory()->post->create( [
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

	}

	public function testDeleteOnlyPostByAuthorCreatesActionMonitorActions() {

		// Create a post
		$post_id = $this->factory()->post->create( [
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
		 * - 1 for DELETE user (the user has no published posts so is no longer public)
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

	public function testDeleteDraftPostDoesNotCreateActionMonitorAction() {

		// Create a post
		$post_id = $this->factory()->post->create( [
			'post_type'   => 'draft',
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
		 * There should be 0 action for deleting a draft post
		 */
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		codecept_debug( $actual );

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

		// Create a 2nd post for the user. Changing one post to draft
		// should trigger an UPDATE for the user.
		$post_two = $this->factory()->post->create([
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

	public function testChangeAuthorsOnPublishedPostCreatesActionMonitorActions() {

		$user_two = $this->factory()->user->create([
			'role' => 'editor'
		]);

		$post_one_for_admin = $this->factory()->post->create([
			'post_type' => 'post',
			'post_status' => 'publish',
			'post_title' => 'test',
			'post_author' => $this->admin,
		]);

		$post_two_for_admin = $this->factory()->post->create([
			'post_type' => 'post',
			'post_status' => 'publish',
			'post_title' => 'test',
			'post_author' => $this->admin,
		]);

		$post_one_for_user_two = $this->factory()->post->create([
			'post_type' => 'post',
			'post_status' => 'publish',
			'post_title' => 'test',
			'post_author' => $user_two,
		]);

		$post_two_for_user_two = $this->factory()->post->create([
			'post_type' => 'post',
			'post_status' => 'publish',
			'post_title' => 'test',
			'post_author' => $user_two,
		]);

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		wp_update_post([
			'ID' => $post_one_for_admin,
			'post_author' => $user_two
		]);

		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );

		// Changing the author of a post should create 3 actions
		// - for the post
		// - 1 for the new author
		// - 1 for the previous author
		$this->assertSame( 3, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $post_one_for_admin,
				'referencedNodeSingularName' => 'post'
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $this->admin,
				'referencedNodeSingularName' => 'user'
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $user_two,
				'referencedNodeSingularName' => 'user'
			] ),
		] );

	}

	public function testChangeOnlyPostFromAuthorToDraftCreatesActionMonitorActions() {

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

		// The author only has 1 published post. Making it a draft post
		// means the author is unpublished and we need to
		// tell Gatsby to delete the user.
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

	public function testPublishScheduledPostCreatesActionMonitorAction() {

		// Create a future post
		$post_id = $this->factory()->post->create([
			'post_type' => 'post',
			'post_status' => 'future',
			'post_title' => 'Test Scheduled Post',
			'post_author' => $this->admin,
			'post_date' => date( "Y-m-d H:i:s", strtotime( '+1 day' ) ),
		]);

		// Make sure action monitor is cleared
		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		// publish the post
		wp_publish_post( $post_id );


		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );

		// There should be 2 actions created.
		// - 1 for the published post
		// - 1 for the author
		$this->assertQuerySuccessful( $actual, [
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

	public function testUpdatePostMetaOfUnublishedPostDoesNotCreatesActionMonitorAction() {

		$post_id = $this->factory()->post->create([
			'post_type' => 'post',
			'post_status' => 'draft',
			'post_title' => 'test',
			'post_author' => $this->admin,
		]);

		// Make sure action monitor is cleared
		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		update_post_meta( $post_id, 'test_post_meta', 'test' );

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

	}


	public function testDeletePostMetaOfUnublishedPostDoesNotCreatesActionMonitorAction() {

		$post_id = $this->factory()->post->create([
			'post_type' => 'post',
			'post_status' => 'draft',
			'post_title' => 'test',
			'post_author' => $this->admin,
		]);

		update_post_meta( $post_id, 'test_post_meta', 'test' );

		// Make sure action monitor is cleared
		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		delete_post_meta( $post_id, 'test_post_meta' );

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

	}

	public function testUpdatePostMetaOfPublishedPostCreatesActionMonitorAction() {

		$post_id = $this->factory()->post->create([
			'post_type' => 'post',
			'post_status' => 'publish',
			'post_title' => 'test update meta',
			'post_author' => $this->admin,
		]);

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		update_post_meta( absint( $post_id ), 'test_meta', 'test_value' );


		$actual = $this->graphql( compact( 'query' ) );

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
			'post_status' => 'publish',
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

		$actual = $this->graphql( compact( 'query' ) );

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

	public function testNewPostTypesDetectedWithGraphqlSupportCreateActionMonitorAction() {

		$post_types = get_post_types([ 'show_in_graphql' => true, 'public' => true ]);
		update_option( '_gatsby_tracked_post_types', $post_types );

		$this->clear_action_monitor();

		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		$added_post_type = 'new_type';
		$post_types[] = $added_post_type;
		update_option( '_gatsby_tracked_post_types', $post_types );

		do_action( 'gatsby_init_action_monitors' );

		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );
		codecept_debug( $actual );

	}

	public function testPostTypeRemovedFromGraphQLCreateActionMonitorAction() {

		$post_types = get_post_types([ 'show_in_graphql' => true, 'public' => true ]);
		$post_types[] = 'remove_me';
		update_option( '_gatsby_tracked_post_types', $post_types );

		$this->clear_action_monitor();

		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		unset( $post_types['remove_me'] );

		update_option( '_gatsby_tracked_post_types', $post_types );

		do_action( 'gatsby_init_action_monitors' );

		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );
		codecept_debug( $actual );
	}

	public function testTaxonomyDetectedWithGraphqlSupportCreateActionMonitorAction() {

		$taxonomies = get_taxonomies([ 'show_in_graphql' => true, 'public' => true ]);
		update_option( '_gatsby_tracked_taxonomies', $taxonomies );

		$this->clear_action_monitor();

		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		$added = 'new_type';
		$taxonomies[] = $added;
		update_option( '_gatsby_tracked_taxonomies', $taxonomies );

		do_action( 'gatsby_init_action_monitors' );

		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );
		codecept_debug( $actual );

	}

	public function testTaxonomyRemovedFromGraphQLCreateActionMonitorAction() {

		$taxonomies = get_taxonomies([ 'show_in_graphql' => true, 'public' => true ]);
		$taxonomies[] = 'remove_me';
		update_option( '_gatsby_tracked_taxonomies', $taxonomies );

		$this->clear_action_monitor();

		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		unset( $taxonomies['remove_me'] );

		update_option( '_gatsby_tracked_taxonomies', $taxonomies );

		do_action( 'gatsby_init_action_monitors' );

		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );
		codecept_debug( $actual );
	}

	// @todo: review the ones below this with Tyler
	public function testCreatePostOfAPublicCustomPostTypeCreatesActionMonitorAction() {

		// register a post type
		register_post_type( 'wp_gatsby_test', [
			'public'              => true,
			'show_in_graphql'     => true,
			'graphql_single_name' => 'wpGatsbyTest',
			'graphql_plural_name' => 'wpGatsbyTests',
		] );

		codecept_debug( get_post_types(['show_in_graphql' => true, 'public' => true ]));

		$this->clear_action_monitor();

		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );


		// Create a post
		$post_id = $this->factory()->post->create( [
			'post_type'   => 'wp_gatsby_test',
			'post_status' => 'publish',
			'post_title'  => 'Title',
			'post_author' => $this->admin,
			'tags_input'  => [ $this->tag ]
		] );


		codecept_debug( get_post( $post_id ) );

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

	public function testCreatePostOfAPubliclyQueryableCustomPostTypeCreatesActionMonitorAction() {

		// Register a publicly queryable post type.
		register_post_type( 'wp_gatsby_test', [
			'public'              => false,
			'publicly_queryable'  => true,
			'show_in_graphql'     => true,
			'graphql_single_name' => 'wpGatsbyPubliclyQ',
			'graphql_plural_name' => 'wpGatsbyPubliclyQs',
		] );

		codecept_debug(
			get_post_types(
				[
					'public'             => false,
					'show_in_graphql'    => true,					
					'publicly_queryable' => true,
				]
			)
		);

		$this->clear_action_monitor();

		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );


		// Create a post
		$post_id = $this->factory()->post->create( [
			'post_type'   => 'wp_gatsby_test',
			'post_status' => 'publish',
			'post_title'  => 'Title',
			'post_author' => $this->admin,
			'tags_input'  => [ $this->tag ]
		] );

		codecept_debug( get_post( $post_id ) );

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
				'referencedNodeSingularName' => 'wpGatsbyPubliclyQ',
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $this->admin,
				'referencedNodeSingularName' => 'user',
			] ),
		] );

	}

	public function testCreateCategoryCreatesActionMonitorAction() {

		// Create a post
		$category_id = $this->factory()->category->create([
			'name' => 'test'
		]);

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

	public function testCreateTermOfPrivateTaxonomyDoesNotCreateActionMonitorAction() {

		register_taxonomy( 'private_taxonomy', 'post', [
			'public' => false,
			'show_in_graphql' => true,
			'graphql_single_name' => 'privateTaxTerm',
			'graphql_plural_name' => 'privateTaxTerms'
		]);

		// Create a post
		$term_id = $this->factory()->term->create([
			'name' => 'test',
			'taxonomy' => 'private_taxonomy',
		]);

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		$this->assertIsValidQueryResponse( $actual );

		// Creating a term of private taxonomy should trigger 0 actions:
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

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

		$user_id = $this->factory()->user->create([
			'role' => 'editor'
		]);

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

	public function testDeleteUserWithoutReassigningPublishedPostsCreatesActionMonitorActions() {

		$user_id = $this->factory()->user->create();
		$post_id = $this->factory()->post->create( [
			'post_type'   => 'post',
			'post_status' => 'publish',
			'post_author' => $user_id,
			'post_title'  => 'test'
		] );

		$page_id = $this->factory()->post->create( [
			'post_type'   => 'page',
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

		codecept_debug( $actual );

		$this->assertIsValidQueryResponse( $actual );

		/**
		 * Deleting a user with no published content should trigger 1 actions
		 * - 1 for the user being deleted
		 * - 1 for the page being deleted
		 * - 1 for the post being deleted
		 * (this will actually create 1 action for each post the author was author of)
		 *
		 * @todo: reduce this to a BULK_DELETE action. The source plugin will need to support this though.
		 */
		$this->assertSame( 3, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		// Assert the action monitor has the actions for the user being deleted
		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'DELETE',
				'referencedNodeID'           => (string) $user_id,
				'referencedNodeSingularName' => 'user'
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'DELETE',
				'referencedNodeID'           => (string) $post_id,
				'referencedNodeSingularName' => 'post'
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'DELETE',
				'referencedNodeID'           => (string) $page_id,
				'referencedNodeSingularName' => 'page'
			] ),
		] );

	}

	public function testDeleteUserAndReassignPostsCreatesActionMonitorAction() {

		$user_id = $this->factory()->user->create([
			'role' => 'editor'
		]);
		$post_id = $this->factory()->post->create( [
			'post_type'   => 'post',
			'post_status' => 'publish',
			'post_author' => $user_id,
			'post_title'  => 'test'
		] );

		$page_id = $this->factory()->post->create( [
			'post_type'   => 'page',
			'post_status' => 'publish',
			'post_author' => $user_id,
			'post_title'  => 'test'
		] );


		// Also create a draft page assigned to the user. This should NOT trigger an action
		// when it's re-assigned during user deletion
		$draft_page_id = $this->factory()->post->create( [
			'post_type'   => 'page',
			'post_status' => 'draft',
			'post_author' => $user_id,
			'post_title'  => 'test'
		] );

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		wp_delete_user( (int) $user_id, (int) $this->admin );

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		codecept_debug( $actual );

		$this->assertIsValidQueryResponse( $actual );

		/**
		 * Deleting a user with 2 published posts and re-assigning should create 4 actions
		 * - 1 for the user being deleted
		 * - 1 for the page being transferred to another author
		 * - 1 for the post being transferred to another author
		 * - 1 for the author that got reassigned to
		 * (this will actually create 1 action for each post the author was author of)
		 *
		 * @todo: reduce this to a BULK_DELETE action. The source plugin will need to support this though.
		 */
		$this->assertSame( 4, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		// Assert the action monitor has the actions for the user being deleted
		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'DELETE',
				'referencedNodeID'           => (string) $user_id,
				'referencedNodeSingularName' => 'user'
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $post_id,
				'referencedNodeSingularName' => 'post'
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $page_id,
				'referencedNodeSingularName' => 'page'
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $this->admin,
				'referencedNodeSingularName' => 'user'
			] ),
		] );

	}

	public function testUpdateUserWithPublishedPostsCreatesActionMonitorAction() {

		$user_id = $this->factory()->user->create([
			'role' => 'editor'
		]);

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

	public function testUpdateUserMetaWithTrackedMetaKeyForPublishedAuthorCreatesActionMonitorAction() {

		$user_id = $this->factory()->user->create([
			'role' => 'editor'
		]   );
		$this->factory()->post->create( [
			'post_type'   => 'post',
			'post_status' => 'publish',
			'post_author' => $user_id,
			'post_title'  => 'test'
		] );

		update_user_meta( $user_id, 'description', 'test...' );

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		update_user_meta( $user_id, 'description', 'test_value' );

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

	public function testUpdateUserMetaWithUntrackedMetaKeyForPublishedAuthorDoesNotCreateActionMonitorAction() {

		$user_id = $this->factory()->user->create();
		$this->factory()->post->create( [
			'post_type'   => 'post',
			'post_status' => 'publish',
			'post_author' => $user_id,
			'post_title'  => 'test'
		] );

		update_user_meta( $user_id, 'show_admin_bar_front', 'test...' );

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		update_user_meta( $user_id, 'show_admin_bar_front', 'test...' );

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		$this->assertIsValidQueryResponse( $actual );

		/**
		 * Updating user meta of an untracked meta_key should not trigger any actions
		 */
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

	}

	public function testDeleteUserMetaForTrackedMetaKeyOfPublishedAuthorCreatesActionMonitorAction() {

		$user_id = $this->factory()->user->create();
		$this->factory()->post->create( [
			'post_type'   => 'post',
			'post_status' => 'publish',
			'post_author' => $user_id,
			'post_title'  => 'test'
		] );

		update_user_meta( $user_id, 'nickname', 'test_value' );

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		delete_user_meta( $user_id, 'nickname' );

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		$this->assertIsValidQueryResponse( $actual );

		/**
		 * Updating user meta with a tracked meta key should create 1 action
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

	public function testDeleteUserMetaForUntrackedMetaKeyOfPublishedAuthorCreatesActionMonitorAction() {

		$user_id = $this->factory()->user->create();
		$this->factory()->post->create( [
			'post_type'   => 'post',
			'post_status' => 'publish',
			'post_author' => $user_id,
			'post_title'  => 'test'
		] );

		update_user_meta( $user_id, 'test', 'test_value' );

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		delete_user_meta( $user_id, 'test' );

		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		$this->assertIsValidQueryResponse( $actual );

		/**
		 * Updating user meta with a tracked meta key should create 1 action
		 */
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

	}

	public function testCreateHierarchicalTermWithParentCreatesActionMonitorAction() {

		$parent_id = $this->factory()->category->create([
			'name' => 'parent'
		]);

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		$child_id = $this->factory()->category->create([
			'name' => 'child',
			'parent' => $parent_id,
		]);

		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 2, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $parent_id,
				'referencedNodeSingularName' => 'category'
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'CREATE',
				'referencedNodeID'           => (string) $child_id,
				'referencedNodeSingularName' => 'category'
			] ),
		] );

	}

	public function testUpdateHierarchicalTermWithParentAndChildCreatesActionMonitorAction() {

		$parent_id = $this->factory()->category->create([
			'name' => 'parent'
		]);

		$child_id = $this->factory()->category->create([
			'name' => 'child',
			'parent' => $parent_id,
		]);

		$grandchild_id = $this->factory()->category->create([
			'name' => 'grandchild',
			'parent' => $child_id,
		]);

		$grandchild_two = $this->factory()->category->create([
			'name' => 'grandchild_two',
			'parent' => $child_id,
		]);

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		wp_update_term( $child_id, 'category', [
			'description' => 'test...',
		]);

		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 4, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $parent_id,
				'referencedNodeSingularName' => 'category'
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $child_id,
				'referencedNodeSingularName' => 'category'
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $grandchild_id,
				'referencedNodeSingularName' => 'category'
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $grandchild_two,
				'referencedNodeSingularName' => 'category'
			] ),
		] );

	}

	public function testDeleteHierarchicalTermThatHasParentAndChildrenCreatesActionMonitorAction() {

		$parent_id = $this->factory()->category->create([
			'name' => 'parent'
		]);

		$child_id = $this->factory()->category->create([
			'name' => 'child',
			'parent' => $parent_id,
		]);

		$grandchild_id = $this->factory()->category->create([
			'name' => 'grandchild',
			'parent' => $child_id,
		]);

		$grandchild_two = $this->factory()->category->create([
			'name' => 'grandchild_two',
			'parent' => $child_id,
		]);

		$this->clear_action_monitor();

		// Query for action monitor actions
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		wp_delete_term( $child_id, 'category' );

		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 4, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $parent_id,
				'referencedNodeSingularName' => 'category'
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'DELETE',
				'referencedNodeID'           => (string) $child_id,
				'referencedNodeSingularName' => 'category'
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $grandchild_id,
				'referencedNodeSingularName' => 'category'
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $grandchild_two,
				'referencedNodeSingularName' => 'category'
			] ),
		] );

	}

	public function testRestorePostFromTrashCreatesActionMonitorAction() {

		$post_data = [
			'post_type' => 'post',
			'post_status' => 'trash',
			'post_title' => 'trashed',
			'post_author' => $this->admin
		];

		$post_id = $this->factory()->post->create( $post_data );

		$this->clear_action_monitor();

		// Publish the post
		wp_update_post( [ 'ID' => $post_id, 'post_status' => 'publish' ] );


		// Query for action monitor actions
		$query = $this->actionMonitorQuery();

		// Execute the query
		$actual = $this->graphql( compact( 'query' ) );

		$this->assertIsValidQueryResponse( $actual );

		/**
		 * Deleting a user with no published content should trigger 2 actions
		 * - 1 for the user being updated
		 * - 1 for the post being restored
		 */
		$this->assertSame( 2, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		// Assert the action monitor has the actions for the user being deleted
		$this->assertQuerySuccessful( $actual, [
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

	public function testUploadPngMediaItemCreatesAction() {

		$this->clear_action_monitor();
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		$filename = WPGATSBY_PLUGIN_DIR . '/tests/_data/images/test.png';
		$image_id = $this->factory()->attachment->create_upload_object( $filename );

		codecept_debug( $image_id );

		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'CREATE',
				'referencedNodeID'           => (string) $image_id,
				'referencedNodeSingularName' => 'mediaItem'
			] ),
		] );

	}

	public function testUpdateMediaItemCreatesAction() {

		$filename = WPGATSBY_PLUGIN_DIR . '/tests/_data/images/test.png';
		$image_id = $this->factory()->attachment->create_upload_object( $filename );

		$this->clear_action_monitor();
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		wp_update_post([ 'ID' => $image_id, 'post_content' => 'test...' ]);

		codecept_debug( $image_id );

		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $image_id,
				'referencedNodeSingularName' => 'mediaItem'
			] ),
		] );

	}

	public function testDeleteMediaItemCreatesAction() {

		$filename = WPGATSBY_PLUGIN_DIR . '/tests/_data/images/test.png';
		$image_id = $this->factory()->attachment->create_upload_object( $filename );

		$this->clear_action_monitor();
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		wp_delete_attachment( $image_id );

		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'DELETE',
				'referencedNodeID'           => (string) $image_id,
				'referencedNodeSingularName' => 'mediaItem'
			] ),
		] );

	}

	public function testCreateNavMenuDoesNotCreateActionMonitorAction() {

		$this->clear_action_monitor();
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		wp_create_nav_menu( 'Test Menu' );

		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );


	}

	public function testAssignNavMenuToLocationCreatesActionMonitorAction() {

		$location_name = 'gatsby-test';
		register_nav_menu($location_name, __( 'Gatsby Test Menu', 'WPGatsby' ) );
		$menu_id = wp_create_nav_menu( __( 'Test Menu', 'WPGatsby' ) );
		$post_id = $this->factory()->post->create();

		wp_update_nav_menu_item(
			$menu_id,
			0,
			[
				'menu-item-title'     => 'Menu item',
				'menu-item-object'    => 'post',
				'menu-item-object-id' => $post_id,
				'menu-item-status'    => 'publish',
				'menu-item-type'      => 'post_type',
			]
		);

		$this->clear_action_monitor();
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		set_theme_mod( 'nav_menu_locations', [ $location_name => (int) $menu_id ] );

		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'CREATE',
				'referencedNodeID'           => (string) $menu_id,
				'referencedNodeSingularName' => 'menu'
			] ),
		] );

	}

	public function testUpdateNavMenuCreatesActionMonitorAction() {

		$location_name = 'gatsby-test';
		register_nav_menu($location_name, __( 'Gatsby Test Menu', 'WPGatsby' ) );
		$menu_id = wp_create_nav_menu( __( 'Test Menu', 'WPGatsby' ) );
		$post_id = $this->factory()->post->create();

		$menu_item_id = wp_update_nav_menu_item(
			$menu_id,
			0,
			[
				'menu-item-title'     => 'Menu item',
				'menu-item-object'    => 'post',
				'menu-item-object-id' => $post_id,
				'menu-item-status'    => 'publish',
				'menu-item-type'      => 'post_type',
			]
		);

		set_theme_mod( 'nav_menu_locations', [ $location_name => (int) $menu_id ] );

		$this->clear_action_monitor();
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		// Add a new menu item
		$new_menu_item = wp_update_nav_menu_item(
			$menu_id,
			0,
			[
				'menu-item-title'     => 'Update Menu item',
				'menu-item-object'    => 'post',
				'menu-item-object-id' => $post_id,
				'menu-item-status'    => 'publish',
				'menu-item-type'      => 'post_type',
			]
		);
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 2, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $menu_id,
				'referencedNodeSingularName' => 'menu'
			] ),
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'UPDATE',
				'referencedNodeID'           => (string) $new_menu_item,
				'referencedNodeSingularName' => 'menuItem'
			] ),
		] );

	}

	public function testDeleteMenuCreatesActionMonitorAction() {

		$location_name = 'gatsby-test';
		register_nav_menu($location_name, __( 'Gatsby Test Menu', 'WPGatsby' ) );
		$menu_id = wp_create_nav_menu( __( 'Test Menu', 'WPGatsby' ) );
		$post_id = $this->factory()->post->create();

		wp_update_nav_menu_item(
			$menu_id,
			0,
			[
				'menu-item-title'     => 'Menu item',
				'menu-item-object'    => 'post',
				'menu-item-object-id' => $post_id,
				'menu-item-status'    => 'publish',
				'menu-item-type'      => 'post_type',
			]
		);

		set_theme_mod( 'nav_menu_locations', [ $location_name => (int) $menu_id ] );

		$this->clear_action_monitor();
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		// Delete the menu
		wp_delete_nav_menu( $menu_id );

		// Deleting a menu creates the following actions
		// - 1 action for DELETE MENU
		// Gatsby will delete the menu and all associated menu items when this action occurs
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'DELETE',
				'referencedNodeID'           => (string) $menu_id,
				'referencedNodeSingularName' => 'menu'
			] ),
		] );

	}

	public function testUpdatePermalinksCreatesActionMonitorAction() {

		$option_name = 'permalink_structure';
		$structure = '/%year%/%monthnum%/%postname%/';
		update_option( $option_name, $structure );

		$this->clear_action_monitor();
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		update_option( $option_name, '/archives/%post_id%' );

		// Updating permalinks should create 1 action
		// - 1 action
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 1, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		$this->assertQuerySuccessful( $actual, [
			$this->expectedNode( 'actionMonitorActions.nodes', [
				'actionType'                 => 'REFETCH_ALL',
				'referencedNodeID'           => (string) 'refetch_all',
				'referencedNodeSingularName' => 'refetchAll'
			] ),
		] );

	}

	public function testUpdateUntrackedOptionDoesNotCreateActionMonitorAction() {

		$this->clear_action_monitor();
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		update_option( 'test_option', 'test' );

		// Updating untracked option should create 0 actions
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

	}

	public function testSetTransientDoesNotCreateActionMonitorAction() {

		$this->clear_action_monitor();
		$query  = $this->actionMonitorQuery();
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

		$transient = set_transient( 'test_transient', 'test', 600 );

		// Setting a transient should create 0 action
		$actual = $this->graphql( compact( 'query' ) );
		$this->assertSame( 0, count( $actual['data']['actionMonitorActions']['nodes'] ) );

	}


}
