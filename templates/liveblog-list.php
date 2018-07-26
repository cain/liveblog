<?php
/**
 * @var $entries
 * @var $post_id
 * @var $liveblog_feed_title
 * @var $time_format
 * @var $date_format
 */
?>
<div id="wpcom-liveblog-container" class="<?php echo esc_html( $post_id ); ?>">
	<div style="position: relative;">
		<h2 class="liveblog-feed-title"> <?php echo esc_html( $liveblog_feed_title ); ?></h2>
		<div class="liveblog-feed">
			<?php foreach ( $entries['entries'] as $entry ) : ?>
				<?php require 'liveblog-single-entry.php' ?>
			<?php endforeach; ?>
		</div>
	</div>
</div>
