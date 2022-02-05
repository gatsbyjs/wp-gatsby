<?php

namespace WPGatsby\ActionMonitor\Monitors;

class AcfMonitor extends Monitor
{
    public function init()
    {
        // ACF Actions
        add_action(
            'acf/update_field_group',
            function () {
                $this->trigger_schema_diff(
                    [
                        'title' => __('Update ACF Field Group', 'WPGatsby'),
                    ]
                );
            }
        );

        add_action(
            'acf/delete_field_group',
            function () {
                $this->trigger_schema_diff(
                    [
                        'title' => __('Delete ACF Field Group', 'WPGatsby'),
                    ]
                );
            }
        );

        add_action(
			'acf/save_post',
			function () {
				$this->trigger_schema_diff(
					[
						'title' => __('Update option page', 'WPGatsby'),
					]
				);
			}
		);
    }
}
