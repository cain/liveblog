<?php
/**
 * @var $entry
 */
$entry_timestamp = \DateTime::createFromFormat( 'U', $entry->entry_time );
?>
<article
	id="id_<?php echo esc_html( $entry->id ); ?>"
	class="liveblog-entry <?php echo true === $entry->key_event ? 'is-key-event' : ''; ?>"
>
	<aside class="liveblog-entry-aside">
		<a class="liveblog-meta-time" href="<?php echo esc_url( $entry->share_link ) ?>">
			<span><?php echo esc_html( apply_filters( 'liveblog_single_entry_displayed_timestamp', $entry_timestamp ) ); ?></span>
			<span><?php echo esc_html( apply_filters( 'liveblog_single_entry_displayed_date', $entry_timestamp ) ); ?></span>
		</a>
		<?php if ( $entry->key_event ) : ?>
			<span class="liveblog-label-highlight">Highlight</span>
		<?php endif; ?>
	</aside>
	<div class="liveblog-entry-main">
		<header class="liveblog-meta">
			<?php if ( $entry->headline ) : ?>
				<h2 class="liveblog-entry-header">
					<?php echo esc_html( $entry->headline ); ?>
				</h2>
			<?php endif; ?>
			<?php if ( $entry->authors ): ?>
				<div class="liveblog-meta-authors">
					<?php foreach($entry->authors as $author ) : ?>
						<?php if( $author['avatar'] ) : ?>
							<div class="liveblog-meta-author-avatar" >
								<?php echo wp_kses_post( $author['avatar'] ); ?>
							</div>
						<?php endif; ?>
						<span class="liveblog-meta-author-name">
							<?php echo esc_html( $author['name'] ); ?>
						</span>
					<?php endforeach; ?>
				</div>
			<?php endif ?>
		</header>
	</div>
	<div class="liveblog-entry-content">
		<?php echo wp_kses_post( $entry->render ); ?>
	</div>
</article>